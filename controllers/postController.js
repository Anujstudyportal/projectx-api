const postModel = require("../models/postModel");
const Tag = require("../models/postTagsModel");
const PostsTag = require("../models/postsTagsModel");
const sequelize = require('../models');
const { errorHandler, pagination } = require("../helpers/customHelper");
const postValidator = require('../validationSchema/postValidator');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.random() * 1e9;
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

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
    try {
      const postData = req.body;
      const tagss = req.body.tags;
  
      const { error } = postValidator.validate(postData, { abortEarly: false });
  
      if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ message: errorMessages });
      }
  
      // Start a transaction
      const t = await sequelize.transaction();
  
      try {
        // Create the post within the transaction
        const post = await postModel.create(postData, { transaction: t });
  
        // Create tags within the transaction
        const postTags = await Tag.bulkCreate(
          tagss.map((tagName) => ({ name: tagName })),
          { transaction: t } // Pass the transaction to bulkCreate
        );
  
        // Create associations within the transaction
        await PostsTag.bulkCreate(
          postTags.map((tag) => ({ post_id: post.id, tag_id: tag.id })),
          { transaction: t } // Pass the transaction again
        );
  
        // Commit the transaction if all operations succeed
        await t.commit();
  
        res.status(201).send(post);
      } catch (e) {
        // Rollback the transaction if any operation fails
        await t.rollback();
  
        let errors = await errorHandler(e);
        res.status(400).json({ errors: errors });
      }
    } catch (error) {
      // Handle any errors outside the transaction
      console.error(error); // Log the error for debugging
      next(error); // Pass the error to Express error handling middleware
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
      next(error);
      // res.status(400).json({ errors: errors });
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

  imgUploadPost:async(req, res, next) => {
     const img = req.doby;
     console.log(img); 
    try {
      
    } catch (error) {
      // Handle any errors outside the transaction
      console.error(error); // Log the error for debugging
      next(error); // Pass the error to Express error handling middleware
    }
  }


};

module.exports = postController;