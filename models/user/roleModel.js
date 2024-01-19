const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Roles = sequelize.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: { msg: "Enter only Alpha" },
        notNull: { msg: "Name is Required" },
      },
    },
    unique_string: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notNull: { msg: "Unique String is Required" },
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true, // Enable soft delete
  }
);

module.exports = Roles;
