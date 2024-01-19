const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Disciplines = sequelize.define(
  "disciplines",
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
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Icon is Required" },
      },
    },
    order_by: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Order By is Required" },
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

module.exports = Disciplines;
