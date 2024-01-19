const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const CommissionSlab = sequelize.define(
  "commission_slabs",
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
    commission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    slab_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_basic: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max: {
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

module.exports = CommissionSlab;
