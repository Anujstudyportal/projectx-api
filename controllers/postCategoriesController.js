const postCategoriesModel = require("../models/postCategoriesModel");
const { errorHandler, pagination } = require("../helpers/customHelper");
const postCategoriesController = {
  getAll: async (req, res) => {
    try {
      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await postCategoriesModel.findAndCountAll({
        where: { deleted_at: null },
        offset: paginate.offset,
        limit: paginate.limit,
      });
      paginate.total_rows = data.count;
      paginate.total_pages = Math.ceil(data.count / paginate.limit);

      return res.json({
        message: "Get Post",
        data: data.rows,
        meta: paginate,
      });
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  addPost: async (req, res, next) => {
    let postData = req.body;
    try {
      const result = await postCategoriesModel.create(postData);
      res.status(201).send(result);
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updatePost: async (req, res, next) => {
    let id = req.params.id;

    let postData = req.body;

    try {
      const result = await postCategoriesModel.update(postData, {
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
  removePost: async (req, res, next) => {
    let id = req.params.id;

    if (typeof id != "number" || id <= 0) {
        res.status(400).json({ errors: [{ param: "Invalid Parameter" }] });
      }
      
    try {
      const result = await postCategoriesModel.destroy({
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

module.exports = postCategoriesController;