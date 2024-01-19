const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Testscores = sequelize.define(
  "testscores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    score_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        isAlpha: { msg: "Enter only Alpha" },
        notNull: { msg: "Name is Required" },
      },
    },
    score_type: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "academic",
      values: ["academic", "general"],
      validate: {
        notNull: { msg: "ScoreType is Required" },
        isIn: {
          args: [["academic", "general"]],
          msg: "Please Enter Between academic or general",
        },
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

module.exports = Testscores;
