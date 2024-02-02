const postModel = require("../models/postModel");
const Tag = require("../models/postTagsModel");
const PostsTag = require("../models/postsTagsModel");
const sequelize = require('../models');
const { errorHandler, pagination } = require("../helpers/customHelper");
const postValidator = require('../validationSchema/postValidator');

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
    let tagss  = req.body.tags;
    
    const { error } = postValidator.validate(postData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const transaction = await sequelize.transaction();
    try {
      

    const post = await postModel.create(postData, { transaction });

    const tags = await Promise.all(
      tagss.map(async (tagName) => {
        const existingTag = await Tag.findOne({ where: { name: tagName } });
        if (existingTag) {
          return existingTag;
        } else {
          return await Tag.create({ name: tagName }, { transaction });
        }
      })
    );

    await Promise.all(
      tags.map(async (tag) => {
        await PostsTag.create({ postId: post.id, tagId: tag.id }, { transaction });
      })
    );

    await transaction.commit();

    res.json({ message: 'Post created successfully', post });
   


      /* ================================= */
      
      
      // const postTags = await PostTag.bulkCreate(
      //   tags.map((tagName) => ({ name: tagName }))
      // );
  
      // // Create associations between post and tags
      // await PostsTags.bulkCreate(
      //   postTags.map((tag) => ({ post_id: post.id, tag_id: tag.id }))
      // );



      // for (const tagInfo of tags) {
      //   const [tag] = await Tag.findOrCreate({ where: { name: tagInfo.name, unique_string: tagInfo.unique_string } });
      //   await post.addTag(tag);
      // }

      // Find or create tags
    // const tagInstances = await Promise.all(
    //   tags.map(async (tag) => {
    //     const [tagInstance] = await Tag.findOrCreate({
    //       where: { name: tag.name },
    //       defaults: { unique_string: tag.unique_string },
    //     });
    //     return tagInstance;
    //   })
    // );

    
    // Create posts_tags associations
    // await Promise.all(
    //   tagInstances.map(async (tag) => {
    //     await postsTagsModel.create({
    //       post_id: post.id,
    //       tag_id: tag.id,
    //     });
    //   })
    // );
      
      /* ================================= */
      

      // res.status(201).send(post);
    
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