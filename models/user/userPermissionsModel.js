const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const userPermissions = sequelize.define(
  "user_permissions",
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
        notNull: { msg: "userId is Required" },
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "roleId is Required" },
      },
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "permissionId is Required" },
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

module.exports = userPermissions;
