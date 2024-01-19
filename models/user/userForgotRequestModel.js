const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const UserModel = require("./userModel");

const userForgotRequest = sequelize.define(
  "user_forgot_requests",
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
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Code is Required" },
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ["not_used", "active", "expired", "used"],
      defaultValue: "active",
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("NOW() + INTERVAL 15 MINUTE"),
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


module.exports = userForgotRequest;
