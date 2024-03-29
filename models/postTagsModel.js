const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const post = require("../models/postModel");
// const Tag = require("../models/postTagsModel");
const postsTags = require("../models/postsTagsModel");
const uuidv4 = require('uuidv4');

const postTags = sequelize.define(
  "postTags",
  {
    name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  unique_string: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: sequelize.fn('uuid'),
  },
  },
  {
    tableName: "post_tags",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

// postTags.belongsToMany(post, { through: 'postsTags', foreignKey: 'tag_id' });
// postTags.sync({ force: true });
module.exports = postTags;
