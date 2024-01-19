const cityModel = require("../models/cityModel");
const { errorHandler, pagination } = require("../helpers/customHelper");
const cityController = {
  getAll: async (req, res) => {
    try {
      let stateId = req.query.state_id;
      if (isNaN(parseInt(stateId)) && !isFinite(stateId)) {
        res.status(409).json({
          errors: [{ param: "Invalid Parameter", state_id: stateId }],
        });
      }

      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await cityModel.findAndCountAll({
        attributes: ["id", "name", "state_id"],
        where: { state_id: stateId, deleted_at: null },
        offset: paginate.offset,
        limit: paginate.limit,
      });
      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get Cities By State",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addCity: async (req, res, next) => {
    let postData = req.body;
    try {
      const result = await cityModel.create(postData);
      res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updateCity: async (req, res, next) => {
    const id = req.params.id;

    if (typeof id != "number" || id <= 0) {
      return res
        .status(409)
        .json({ errors: [{ param: "Invalid Parameter", id: id }] });
    }

    let postData = req.body;

    try {
      const result = await cityModel.update(postData, {
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
  removeCity: async (req, res, next) => {
    let id = req.params.id;

    if (isNaN(parseInt(id)) && !isFinite(id)) {
      res.status(409).json({ errors: [{ param: "Invalid Parameter" }] });
    }

    try {
      const result = await cityModel.destroy({
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

module.exports = cityController;
