const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Vendors = sequelize.define(
  "vendors",
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
    short_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notNull: { msg: "Short Name is Required" },
      },
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Country is Required" },
      },
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "State is Required" },
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "City is Required" },
      },
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notNull: { msg: "Address is Required" },
        len: [0, 500],
      },
    },
    is_direct: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: { isIn: [[0, 1]] },
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

module.exports = Vendors;
