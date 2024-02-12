const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const campusModel = require("../campusModel");
const ProgramCampus = sequelize.define(
  "program_campuses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    campus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Campus is Required" },
        isNumeric: { msg: "Campus is allow only numeric value" },
      },
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Program is Required" },
        isNumeric: { msg: "Program is allow only numeric value" },
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "City is Required" },
        isNumeric: { msg: "City is allow only numeric value" },
      },
    },
    program_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    application_fee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Application Fee is Required" },
      },
    },
    tuition_fee: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: { msg: "Application Fee is Required" },
      },
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

// ProgramCampus.belongsTo(campusModel, {
//   foreignKey: "campus_id",
//   as: "campusInfo",
// });

module.exports = ProgramCampus;