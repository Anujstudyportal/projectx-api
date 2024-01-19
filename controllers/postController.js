const postModel = require("../models/postModel");
const Tag = require("../models/postTagsModel");
const postsTagsModel = require("../models/postsTagsModel");
const { errorHandler, pagination } = require("../helpers/customHelper");
const postController = {
  getAll: async (req, res) => {
    try {
      const pagination_data = {};
      pagination_data.page = parseInt(req.query.page);
      pagination_data.per_page = parseInt(req.query.per_page);

      let paginate = await pagination(pagination_data);

      const data = await postModel.findAndCountAll({
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
    let tags  = req.body.tags;
    try {
      
      const post = await postModel.create(postData);

      /* ================================= */
      
      // for (const tagInfo of tags) {
      //   const [tag] = await Tag.findOrCreate({ where: { name: tagInfo.name, unique_string: tagInfo.unique_string } });
      //   await post.addTag(tag);
      // }

      // Find or create tags
    const tagInstances = await Promise.all(
      tags.map(async (tag) => {
        const [tagInstance] = await Tag.findOrCreate({
          where: { name: tag.name },
          defaults: { unique_string: tag.unique_string },
        });
        return tagInstance;
      })
    );

    
    await post.addTags(tagInstances);

      /* ================================= */
      

      res.status(201).send(post);
    
    } catch (e) {
      let errors = await errorHandler(e);
      res.status(400).json({ errors: errors });
    }
  },
  updatePost: async (req, res, next) => {
    let id = req.params.id;

    let postData = req.body;

    try {
      const result = await postModel.update(postData, {
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
      const result = await postModel.destroy({
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

module.exports = postController;