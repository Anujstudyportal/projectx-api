const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Campuses = sequelize.define(
  "campuses",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "country_id_state_id_city_id_name",
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
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

module.exports = Campuses;
