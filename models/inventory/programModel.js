const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const programCampusModel = require("./programCampusModel");
const programIntakeModel = require("./programIntakeModel");
const programTestscoreModel = require("./programTestscoreModel");

const Program = sequelize.define(
  "programs",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    study_level_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Studylevel is required" },
        isNumeric: { msg: "Studylevel is allow only numeric value" },
      },
    },
    discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Discipline is required" },
        isNumeric: { msg: "Discipline is allow only numeric value" },
      },
    },
    institution_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Institution is required" },
        isNumeric: { msg: "Institution is allow only numeric value" },
      },
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "Program Name is required" },
      },
    },
    unique_string: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notNull: { msg: "Url is required" },
        isUrl: { msg: "Invalid Url" },
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Duration is required" },
        isNumeric: { msg: "Duration is allow only numeric value" },
      },
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    min_requirement: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: { len: [1, 500] },
    },
    attendanceOn: {
      type: DataTypes.ENUM("On Campus", "Online", "Blended"),
      allowNull: false,
      validate: {
        notNull: { msg: "attendanceOn is required" },
        isIn: [["On Campus", "Online", "Blended"]],
        msg: "Invalid Value",
      },
    },

    is_fulltime: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "is FullTime is required" },
        isIn: { args: [[0, 1]], msg: "Invalid Value" },
      },
      get() {
        return this.getDataValue("is_fulltime") === 1 ? "Yes" : "No";
      },
    },
    is_visible: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "IsVisible is required" },
        isIn: { args: [[0, 1]], msg: "Invalid Value" },
      },
      get() {
        return this.getDataValue("is_visible") === 1 ? "Yes" : "No";
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

// Program.hasMany(programCampusModel, {
//   as: "campuses",
//   foreignKey: "program_id",
// });
// Program.hasMany(programIntakeModel, {
//   as: "intakes",
//   foreignKey: "program_id",
// });
// Program.hasMany(programTestscoreModel, {
//   as: "testscores",
//   foreignKey: "program_id",
// });
module.exports = {
  Program: Program,
  programCampus: programCampusModel,
  programIntake: programIntakeModel,
  programTestscore: programTestscoreModel,
  sequelizer: sequelize,
};