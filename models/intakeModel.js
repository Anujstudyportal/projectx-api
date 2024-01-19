const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Intakes = sequelize.define(
  "intakes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: { msg: "Enter only Alpha" },
        notNull: { msg: "Name is Required" },
      },
    },
    intake_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        isAlpha: { msg: "Enter only Alpha" },
        notNull: { msg: "Intake Type is Required" },
      },
    },
    order_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Order By is Required" },
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Status is Required" },
      },
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

module.exports = Intakes;
