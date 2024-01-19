const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const Commission = sequelize.define(
  "commissions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    commission_info_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    studylevel_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    amount_type: {
      type: DataTypes.ENUM("flat", "percent"),
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    shore_type: {
      type: DataTypes.ENUM("onshore", "offshore"),
      allowNull: true,
    },
    old_institution_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true, // Enable soft delete
  }
);

module.exports = Commission;
