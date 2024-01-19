const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Statuses = sequelize.define(
  "statuses",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "status is already exist!",
      },
      validate: {
        is: { args: [/^[a-z\-_\s]+$/i], msg: "Enter only Alpha Spaces" },
        notNull: { msg: "Name is Required" },
      },
    },
    short_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notNull: { msg: "Short Name is Required" },
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

module.exports = Statuses;
