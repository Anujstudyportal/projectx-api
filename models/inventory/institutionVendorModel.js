const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const vendorModel = require("../vendorModel");
const InstitutionVendor = sequelize.define(
  "institution_vendors",
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
      field: "vendor_id",
    },
    agreement_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    valid_till_at: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    is_default: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
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
InstitutionVendor.belongsTo(vendorModel, {
  foreignKey: "vendor_id",
  as: "vendorInfo",
});
module.exports = InstitutionVendor;
