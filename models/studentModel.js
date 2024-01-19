const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Students = sequelize.define(
  "students",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    lead_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Lead is Required" },
        isNumeric: true,
      },
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Lead is Required" },
        isNumeric: true,
      },
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_passport: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    application_limit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    initial_called_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    course_finalization_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    enrolled_at: {
      type: DataTypes.DATE,
      allowNull: true,
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

module.exports = Students;
