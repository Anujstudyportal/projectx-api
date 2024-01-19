const {
  Program,
  programCampus,
  programIntake,
  programTestscore,
  sequelizer,
} = require("../../models/inventory/programModel");
const { errorHandler, pagination } = require("../../helpers/customHelper");
const programController = {
  getAll: async (req, res) => {
    const whereInstitutionCondition = { deleted_at: null };
    try {
      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);
      let paginate = await pagination(pagination_data);

      const data = await Program.findAndCountAll({
        where: whereInstitutionCondition,
        offset: paginate.offset,
        limit: paginate.limit,
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
            association: "intakes",
            attributes: ["id", "intake_id"],
            include: {
              association: "intakeInfo",
              attributes: ["name"],
            },
          },
          {
            association: "testscores",
            attributes: ["id", "testscore_id"],
            include: {
              association: "testscoreInfo",
              attributes: ["score_name"],
            },
          },
        ],
      });

      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get Programs",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addProgram: async (req, res) => {
    let programData = req.body;
    let intakeArr;
    let testscoreArr;
    let campusArr;
    if (req.body.intakes && req.body.intakes.length > 0) {
      intakeArr = req.body.intakes;
    } else {
      const errors = [{ intakes: "Intakes is not Array" }];
      return res.status(400).json({ errors: errors });
    }
    if (req.body.campuses && req.body.campuses.length > 0) {
      campusArr = req.body.campuses;
    } else {
      const errors = [{ campuses: "Campus is not Array" }];
      return res.status(400).json({ errors: errors });
    }

    if (req.body.testscores && req.body.testscores.length > 0) {
      testscoreArr = req.body.testscores;
    } else {
      const errors = [{ testscores: "Testscore is not Array" }];
      return res.status(400).json({ errors: errors });
    }

       const t=sequelizer.transaction();

        try {
          // Create a Program
          const initialProgramAIValue = (await Program.count()) + 1;
          await sequelizer.query(
            `ALTER TABLE programs AUTO_INCREMENT=${initialProgramAIValue};`,
            { transaction: t });
            
          const program = await Program.create(programData, {
            transaction: t });

          // Create Program Campuses
          const initialCampusAIValue = (await programCampus.count()) + 1;

          await sequelizer.query(
            `ALTER TABLE program_campuses AUTO_INCREMENT=${initialCampusAIValue};`,
            { transaction: t });

          const campusResult = campusArr.map((value) => {
            return { ...value, program_id: program.id };
          });

          await programCampus.bulkCreate(campusResult, {
            returning: true,
            ignoreDuplicates: true,
            transaction: t,
            fields: ["id", "program_id", "campus_id"],
          });

          // Create Program Intakes
          const initialIntakeAIValue = (await programIntake.count()) + 1;

          await sequelizer.query(
            `ALTER TABLE program_intakes AUTO_INCREMENT=${initialIntakeAIValue};`,
            { transaction: t });

          const intakeResult = intakeArr.map((value) => {
            return { ...value, program_id: program.id };
          });

          await programIntake.bulkCreate(intakeResult, {
            returning: true,
            ignoreDuplicates: true,
            transaction: t,
            fields: ["id", "program_id", "intake_id"],
          });

          // Create Program Testscores
          const initialTestscoreAIValue = (await programTestscore.count()) + 1;

          await sequelizer.query(
            `ALTER TABLE program_testscores AUTO_INCREMENT=${initialTestscoreAIValue};`,
            { transaction: t });

          const testscoreResult = testscoreArr.map((value) => {
            return { ...value, program_id: program.id };
          });

          await programTestscore.bulkCreate(testscoreResult, {
            returning: true,
            ignoreDuplicates: true,
            transaction: t,
            fields: ["id", "program_id", "testscore_id"],
          });

          await t.commit();
          res.status(201).json({ message: "Successfully Inserted" });

        } catch (e) {
          await t.rollback();
          const errors = await errorHandler(e);
          res.status(400).json({ errors: errors });
        }
  },
  updateProgram: async (req, res) => {
    
    let programData = req.body;
    let intakeArr;
    let testscoreArr;
    let campusArr;

    if (req.body.intakes && req.body.intakes.length > 0) {
      intakeArr = req.body.intakes;
    } else {
      const errors = [{ intakes: "Intakes is not Array" }];
      return res.status(400).json({ errors: errors });
    }

    if (req.body.campuses && req.body.campuses.length > 0) {
      campusArr = req.body.campuses;
    } else {
      const errors = [{ campuses: "Campus is not Array" }];
      return res.status(400).json({ errors: errors });
    }

    if (req.body.testscores && req.body.testscores.length > 0) {
      testscoreArr = req.body.testscores;
    } else {
      const errors = [{ testscores: "Testscore is not Array" }];
      return res.status(400).json({ errors: errors });
    }

    const t = await sequelizer.transaction();
            try {
              // Update the program
              await Program.update(programData, {
                where: { id: programData.id },
                transaction: t,
              });

              // Update Program Campuses
              const initialCampusAIValue = (await programCampus.count()) + 1;

              await sequelizer.query(
                `ALTER TABLE program_campuses AUTO_INCREMENT=${initialCampusAIValue};`,
                { transaction: t }
              );

              const campusResult = campusArr.map((value) => {
                return { ...value, program_id: programData.id };
              });

              await programCampus.destroy({
                where: {
                  program_id: programData.id,
                  campus_id: {
                    [sequelizer.Sequelize.Op.notIn]: campusArr.map(
                      (item) => item.campus_id
                    ),
                  },
                },
              });

              const updatedCampuses = await programCampus.bulkCreate(
                campusResult,
                {
                  updateOnDuplicate: ["program_id", "campus_id", "deleted_at"], 
                  returning: true,
                  transaction: t,
                  ignoreDuplicates: true,
                }
              );

              // Update Program Intake
              const initialIntakeAIValue = (await programIntake.count()) + 1;

              await sequelizer.query(
                `ALTER TABLE program_intakes AUTO_INCREMENT=${initialIntakeAIValue};`,
                { transaction: t }
              );

              const intakeResult = intakeArr.map((value) => {
                return { ...value, program_id: programData.id };
              });

              await programIntake.destroy({
                where: {
                  program_id: programData.id,
                  intake_id: {
                    [sequelizer.Sequelize.Op.notIn]: intakeArr.map(
                      (item) => item.intake_id
                    ),
                  },
                },
              });

              const updatedIntakes = await programIntake.bulkCreate(
                intakeResult,
                {
                  updateOnDuplicate: ["program_id", "intake_id", "deleted_at"],
                  returning: true,
                  transaction: t,
                  ignoreDuplicates: true,
                }
              );

              // Update Program Testscore
              const initialTestscoreAIValue =
                (await programTestscore.count()) + 1;

              await sequelizer.query(
                `ALTER TABLE program_testscores AUTO_INCREMENT=${initialTestscoreAIValue};`,
                { transaction: t }
              );

              const testscoreResult = testscoreArr.map((value) => {
                return { ...value, program_id: programData.id };
              });

              await programTestscore.destroy({
                where: {
                  program_id: programData.id,
                  testscore_id: {
                    [sequelizer.Sequelize.Op.notIn]: testscoreArr.map(
                      (item) => item.testscore_id
                    ),
                  },
                },
              });

              const updatedTestscores = await programTestscore.bulkCreate(
                testscoreResult,
                {
                  updateOnDuplicate: [
                    "program_id",
                    "testscore_id",
                    "deleted_at",
                  ],
                  returning: true,
                  transaction: t,
                  ignoreDuplicates: true,
                }
              );
                t.commit();
              res.status(200).json({ message: "Successfully Updated"});
            } catch (e) {
             t.rollback();
              const errors = await errorHandler(e);
              res.status(400).json({ errors });
            }
  },
};

module.exports = programController;
