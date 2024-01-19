const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const CommissionInfo = sequelize.define(
  "commission_info",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    institution_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    campus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_primary: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    is_slab: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    slab_type: {
      type: DataTypes.ENUM("intake", "year", "seat", "not_specified"),
      allowNull: false,
      defaultValue: "not_specified",
    },
    slab_value: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unique_string: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "unique_string",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_type: {
      type: DataTypes.STRING(50),
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

module.exports = CommissionInfo;
