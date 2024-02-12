const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const campusModel = require("../campusModel");
const InstitutionCampus = sequelize.define(
  "institution_campuses",
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
    campus_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

// InstitutionCampus.belongsTo(campusModel, {
//   foreignKey: "campus_id",
//   as: "campusInfo",
// });

module.exports = InstitutionCampus;