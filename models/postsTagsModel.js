const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const postsTags = sequelize.define(
  "postsTags",
  {
    post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  },
  {
    tableName: "posts_tags",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);
// postsTags.sync({ force: true });
module.exports = postsTags;
