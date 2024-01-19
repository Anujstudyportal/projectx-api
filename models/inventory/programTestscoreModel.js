const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const testscoreModel = require("../testscoreModel");

const ProgramTestscore = sequelize.define(
  "program_testscores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    testscore_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Testscore is Required" },
        isNumeric: { msg: "Testscore is allow only numeric value" },
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
    score: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: { notNull: { msg: "Score is Required" } },
    },
    min_score: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    timestamps: true, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true, // Enable soft deletion (deleted_at field)
  }
);

ProgramTestscore.belongsTo(testscoreModel, {
  foreignKey: "testscore_id",
  as: "testscoreInfo",
});

module.exports = ProgramTestscore;