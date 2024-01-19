const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize"); // Replace with your actual database connection file

const ProgramStudentShortlist = sequelize.define(
  "program_student_shortlists",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_applied: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    program_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unique_string: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "unique_string",
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

module.exports = ProgramStudentShortlist;