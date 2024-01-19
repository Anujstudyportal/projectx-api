const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Agents = sequelize.define(
  "agents",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contact_person: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    orgranizaion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "agents",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

module.exports = Agents;
