const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const intakeModel = require("../intakeModel");
const ProgramIntake = sequelize.define(
  "program_intakes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Program is Required" },
        isNumeric: { msg: "Program is allow only numeric value" },
      },
    },
    intake_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Intake is Required" },
        isNumeric: { msg: "Intake is allow only numeric value" },
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

ProgramIntake.belongsTo(intakeModel, {
  foreignKey: "intake_id",
  as: "intakeInfo",
});

module.exports = ProgramIntake;