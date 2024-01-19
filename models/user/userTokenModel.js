const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const UserToken = sequelize.define(
  "tokens",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Token is Required" },
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "User is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "UserId is Invalid",
        },
      },
    },
    parent_token_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    token_type: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "access_token",
      values: ["access_token", "refresh_token"],
    },
    token_status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "active",
      values: ["active", "revoked", "expired", "refreshed"],
    },
    expire_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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

module.exports = UserToken;
