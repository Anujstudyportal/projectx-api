const { errorHandler, pagination } = require("../helpers/customHelper");
const countryModel = require("../models/CountryModel");
const countryController = {
  getAll: async (req, res) => {
    const pagination_data = {};
    pagination_data.page = parseInt(req.query.page);
    pagination_data.per_page = parseInt(req.query.per_page);

    let paginate = await pagination(pagination_data);

    try {
      const data = await countryModel.findAndCountAll({
        attributes: [
          "id",
          "name",
          "short_name",
          "mobile_length",
          "currency",
          "currency_code",
          "currency_symbol",
        ],
        where: { deleted_at: null },
        offset: paginate.offset,
        limit: paginate.limit,
      });

      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get All Countries",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addCountry: async (req, res, next) => {
    let postData = req.body;
    try {
      const result = await countryModel.create(postData);
      res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updateCountry: async (req, res, next) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      res
        .status(409)
        .json({ errors: [{ param: "Invalid Parameter", id: id }] });
    }

    let postData = req.body;

    try {
      const result = await countryModel.update(postData, {
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
  removeCountry: async (req, res, next) => {
    let id = req.params.id;

    if (isNaN(parseInt(id)) && !isFinite(id)) {
      res.status(409).json({ errors: [{ param: "Invalid Parameter" }] });
    }

    try {
      const result = await countryModel.destroy({
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

module.exports = countryController;
