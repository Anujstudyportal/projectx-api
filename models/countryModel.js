const { DataTypes } = require("sequelize");
const sequelize = require("./index");
const States = require("./StateModel"); // Import the States model

const Countries = sequelize.define(
  "countries",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    short_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: { args: "^[A-Za-z? ]+$", msg: "Enter only Alpha Spaces" },
        len: {
          args: [2],
          msg: "Enter atleast 2 Characters",
        },
        notNull: { msg: "Short Name is Required" },
      },
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: { msg: "Enter only Alpha" },
        notNull: { msg: "Name is Required" },
      },
    },
    phone_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Phonecode is Required" },
      },
    },
    mobile_length: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile Length is Required" },
      },
    },
    currency: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        is: { args: "^[A-Za-z? ]+$", msg: "Enter only Alpha Spaces" },
        notNull: { msg: "Currency is Required" },
      },
    },
    currency_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notNull: { msg: "Currency code is Required" },
      },
    },
    currency_symbol: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notNull: { msg: "Currency Symbol is Required" },
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
Countries.hasMany(States, { foreignKey: "country_id", as: "states" });
module.exports = Countries;
