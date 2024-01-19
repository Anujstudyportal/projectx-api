const { DataTypes } = require("sequelize");
const sequelize = require("../index");

const ProgramShortlist = sequelize.define(
  "program_shortlists",
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
    timestamps: true, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true, // Enable soft delete
  }
);

module.exports = ProgramShortlist;