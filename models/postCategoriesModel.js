const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const postCategories = sequelize.define(
  "postCategories",
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      unique_string: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      featured_image: {
        type: DataTypes.TEXT,
      },
      parent_category_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      category_type: {
        type: DataTypes.ENUM('portal', 'destination', 'institution'),
        defaultValue: 'portal',
      },
  },
  {
    tableName: "post_categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

module.exports = postCategories;
