const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Permissions = sequelize.define(
  "permissions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
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
    app_controller: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notNull: { msg: "App Controller is Required" },
      },
    },
    app_function: {
      type: DataTypes.STRING(70),
      allowNull: false,
      validate: {
        notNull: { msg: "App Function is Required" },
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


module.exports = Permissions;