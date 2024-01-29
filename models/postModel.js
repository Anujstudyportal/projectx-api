const { DataTypes } = require("sequelize");
const sequelize = require("./index");
// const postModel = require("../models/postModel");
const Tag = require("../models/postTagsModel");
const PostsTags = require("../models/postsTagsModel");

const Posts = sequelize.define(
  "posts",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      post_summary: {
        type: DataTypes.STRING(512),
      },
      post_content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_url: {
        type: DataTypes.STRING(255),
      },
      featured_image: {
        type: DataTypes.STRING(255),
      },
      post_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      post_module_type: {
        type: DataTypes.ENUM('portal', 'destination', 'institution'),
      },
      post_module_id: {
        type: DataTypes.INTEGER,
      },
      post_category_id: {
        type: DataTypes.INTEGER,
      },
      post_status: {
        type: DataTypes.ENUM('published', 'draft', 'hidden', 'deleted'),
        defaultValue: 'draft',
      },
      user_id: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      user_type: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      published_at: {
        type: DataTypes.DATE,
      },
      till_date: {
        type: DataTypes.DATE,
      },
  },
  {
    tableName: "posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

Posts.belongsToMany(Tag, { through: 'PostsTags', foreignKey: 'post_id' });

// Explicitly define addTags function
// Posts.prototype.addTags = async function (tags) {
//   await this.addTags(tags);
// };
// Posts.belongsToMany(Tag, { through: 'postsTags', foreignKey: 'post_id' });


module.exports = Posts;
