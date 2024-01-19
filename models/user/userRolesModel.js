const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const UserRoles = sequelize.define(
  "user_roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "User is Required" },
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Role is Required" },
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

module.exports = UserRoles;