const {
  Institution,
  institutionCampus,
  institutionVendor,
  sequelizer,
} = require("../../models/inventory/institutionModel");
const { errorHandler, pagination } = require("../../helpers/customHelper");
const institutionController = {
  getAll: async (req, res) => {
    try {
      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await Institution.findAndCountAll({
        offset: paginate.offset,
        limit: paginate.limit,
        distinct: true,
        include: [
          {
            association: "campuses",
            attributes: ["id", "campus_id"],
            include: {
              association: "campusInfo",
              attributes: ["name"],
            },
          },
          {
            association: "vendors",
            attributes: ["id", "vendor_id"],
            include: {
              association: "vendorInfo",
              attributes: ["name"],
            },
          },
        ],
      });
      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get Institution",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addInstitution: async (req, res) => {
    let institutionData = req.body;
    let vendorArr;
    if (req.body.vendors && req.body.vendors.length > 0) {
      vendorArr = req.body.vendors;
    } else {
      const errors = [{ vendors: "Vendor is not Array" }];
      return res.status(400).json({ errors: errors });
    }
    let campusArr;
    if (req.body.campuses && req.body.campuses.length > 0) {
      campusArr = req.body.campuses;
    } else {
      const errors = [{ campuses: "Campus is not Array" }];
      return res.status(400).json({ errors: errors });
    }

    // Example of a transaction
    const t =await sequelizer.transaction();
    
        try {
          const initialInstitutionAIValue = (await Institution.count()) + 1;
          await sequelizer.query(
            `ALTER TABLE institutions AUTO_INCREMENT=${initialInstitutionAIValue};`,
            { transaction: t }
          );
          // Create a institution
          const institution = await Institution.create(institutionData, {
            transaction: t,
          });

          const campusResult = campusArr.map((value) => {
            return { ...value, institution_id: institution.id };
          });

          const initialCampusAIValue = (await institutionCampus.count()) + 1;

          await sequelizer.query(
            `ALTER TABLE institution_campuses AUTO_INCREMENT=${initialCampusAIValue};`,
            { transaction: t }
          );

          // Create Institution Campuses
          const IC = await institutionCampus.bulkCreate(campusResult, {
            returning: true,
            ignoreDuplicates: true,
            transaction: t,
            fields: ["id", "institution_id", "campus_id"],
          });

          // Create Institution Vendors
          const vendorResult = vendorArr.map((value) => {
            return {
              ...value,
              institution_id: institution.id,
              is_default: req.body.default_vendor == value.vendor_id ? 1 : 0,
            };
          });

          const initialVendorAIValue = (await institutionVendor.count()) + 1;

          await sequelizer.query(
            `ALTER TABLE institution_vendors AUTO_INCREMENT=${initialVendorAIValue};`,
            { transaction: t }
          );

          const IV = await institutionVendor.bulkCreate(vendorResult, {
            returning: true,
            ignoreDuplicates: true,
            transaction: t,
            fields: ["id", "institution_id", "vendor_id"],
          });

          await t.commit();
          res.status(201).json({ message: "Successfully Inserted" });
        } catch (error) {
          await t.rollback();
          const errors = await errorHandler(error);
          res.status(400).json({ errors });
        }


  },
  updateInstitution: async (req, res) => {
    let institutionData = req.body;
    let vendorArr;
    if (req.body.vendors && req.body.vendors.length > 0) {
      vendorArr = req.body.vendors;
    } else {
      const errors = [{ vendors: "Vendor is not Array" }];
      return res.status(400).json({ errors: errors });
    }
    let campusArr;
    if (req.body.campuses && req.body.campuses.length > 0) {
      campusArr = req.body.campuses;
    } else {
      const errors = [{ campuses: "Campus is not Array" }];
      return res.status(400).json({ errors: errors });
    }

    const t=await sequelizer.transaction();

            try {
              // Update the institution
              await Institution.update(institutionData, {
                where: { id: institutionData.id },
                transaction: t,
              });

              const campusResult = campusArr.map((value) => {
                return { ...value, institution_id: institutionData.id };
              });

              await institutionCampus.destroy({
                where: {
                  institution_id: institutionData.id,
                  campus_id: {
                    [sequelizer.Sequelize.Op.notIn]: campusArr.map(
                      (item) => item.campus_id
                    ),
                  },
                },
              });

              const initialCampusAIValue =
                (await institutionCampus.count()) + 1;

              await sequelizer.query(
                `ALTER TABLE institution_campuses AUTO_INCREMENT=${initialCampusAIValue};`,
                { transaction: t }
              );
              // Update Institution Campuses
              const updatedCampuses = await institutionCampus.bulkCreate(
                campusResult,
                {
                  updateOnDuplicate: [
                    "institution_id",
                    "campus_id",
                    "deleted_at",
                  ],
                  returning: true,
                  transaction: t,
                  ignoreDuplicates: true,
                }
              );

              const vendorResult = vendorArr.map((value1) => {
                return {
                  ...value1,
                  institution_id: institutionData.id,
                  is_default:
                    req.body.default_vendor == value1.vendor_id ? 1 : 0,
                };
              });


              await institutionVendor.destroy({
                where: {
                  institution_id: institutionData.id,
                  vendor_id: {
                    [sequelizer.Sequelize.Op.notIn]: vendorArr.map(
                      (item) => item.vendor_id
                    ),
                  },
                },
              });
              const initialVendorAIValue =
                (await institutionVendor.count()) + 1;

              await sequelizer.query(
                `ALTER TABLE institution_vendors AUTO_INCREMENT=${initialVendorAIValue};`,
                { transaction: t }
              );

              // Update Institution Vendors
              const updatedVendors = await institutionVendor.bulkCreate(
                vendorResult,
                {
                  updateOnDuplicate: [
                    "institution_id",
                    "is_default",
                    "vendor_id",
                    "deleted_at",
                  ], 
                  returning: true,
                  ignoreDuplicates: true,
                  transaction: t,
                }
              );
              await t.commit();
              res.status(200).json({
                message: "Successfully Updated",
              });
            } catch (e) {
              await t.rollback();
              const errors = await errorHandler(e);
              res.status(400).json({ errors });
            }
  },
};

module.exports = institutionController;