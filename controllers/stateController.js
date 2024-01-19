const stateModel = require("../models/StateModel");
const { errorHandler, pagination } = require("../helpers/customHelper");

const stateController = {
  getAll: async (req, res) => {
    try {
      let countryId = req.query.country_id;
      if (typeof countryId != "number" || countryId <= 0) {
            res.status(409).json({
              errors: [{ param: "Invalid Parameter", country_id: countryId }],
            });
          }

      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await stateModel.findAndCountAll({
        attributes: ["id", "name", "country_id"],
        where: { country_id: countryId },
        offset: paginate.offset,
        limit: paginate.limit,
      });
      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get States By Country",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addState: async (req, res, next) => {
    let postData = req.body;
    try {
      const result = await stateModel.create(postData);
      res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updateState: async (req, res, next) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      res
        .status(409)
        .json({ errors: [{ param: "Invalid Parameter", id: id }] });
    }

    let postData = req.body;

    try {
      const result = await stateModel.update(postData, {
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
  removeState: async (req, res, next) => {
    let id = req.params.id;

    if (isNaN(parseInt(id)) && !isFinite(id)) {
      res.status(400).json({ errors: [{ param: "Invalid Parameter" }] });
    }

    try {
      const result = await stateModel.destroy({
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

module.exports = stateController;
