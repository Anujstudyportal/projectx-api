const vendorModel = require("../models/vendorModel");
const { errorHandler, pagination } = require("../helpers/customHelper");
const vendorController = {
  getAll: async (req, res) => {
    try {
      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await vendorModel.findAndCountAll({
        where: { deleted_at: null },
        offset: paginate.offset,
        limit: paginate.limit,
      });
      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get Vendors",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addVendor: async (req, res) => {
    let postData = req.body;
    try {
      const result = await vendorModel.create(postData);
      res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updateVendor: async (req, res) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      res
        .status(400)
        .json({ errors: [{ param: "Invalid Parameter", id: id }] });
    }

    let postData = req.body;

    try {
      const result = await vendorModel.update(postData, {
        where: { id: id },
      });
      if (result == 1) {
        res.status(200).json({ message: "Successfully Updated!" });
      }
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  removeVendor: async (req, res, next) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      res.status(400).json({ errors: [{ param: "Invalid Parameter" }] });
    }

    try {
      const result = await vendorModel.destroy({
        where: { id: id },
      });
      if (result == 1) {
        res.status(200).json({ message: "Successfully Removed!" });
      }
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
};

module.exports = vendorController;
