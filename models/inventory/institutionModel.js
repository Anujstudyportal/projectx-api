const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const institutionCampusModel = require("./institutionCampusModel");
const institutionVendorModel = require("./institutionVendorModel");

const Institution = sequelize.define(
  "institutions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
      },
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: { msg: "Country is required only numeric value" },
        notNull: { msg: "Country is required" },
      },
    },
    alias_name: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: sequelize.col("name"),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM("university", "college", "school"),
      allowNull: false,
      validate: {
        notNull: { msg: "type is required" },
        isIn: {
          args: [["university", "college", "school"]],
          msg: "Invalid Value",
        },
      },
    },
    logo: {
      type: DataTypes.STRING(150),
      defaultValue:
        "https://assets.dummy.com/images/institutions/universityplaceholder.png",
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notNull: { msg: "Url is Required" },
        isUrl: { msg: "Invalid Url" },
      },
    },
    shore_type: {
      type: DataTypes.ENUM("onshore", "offshore", "both"),
      allowNull: false,
      validate: {
        notNull: { msg: "Shore Type is required" },
        isIn: {
          args: [["onshore", "offshore", "both"]],
          msg: "Invalid Value",
        },
      },
    },
    is_direct: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Contract Type is required" },
        isIn: { args: [[0, 1]], msg: "Invalid Value" },
      },
      get() {
        return this.getDataValue("is_direct") === 1 ? "Yes" : "No";
      },
    },
    is_public: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Institution Type is required" },
        isIn: { args: [[0, 1]], msg: "Invalid Value" },
      },
      get() {
        return this.getDataValue("is_public") === 1 ? "Yes" : "No";
      },
    },
    is_pgwp: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "PGWP is required" },
        isIn: { args: [[0, 1]], msg: "Invalid Value" },
      },
      get() {
        return this.getDataValue("is_pgwp") === 1 ? "Yes" : "No";
      },
    },
    commission_currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        notNull: { msg: "Commission Currency is required" },
        len: [3, 3],
      },
    },
    status: {
      type: DataTypes.ENUM("active", "blocked", "hidden", "banned"),
      defaultValue: "hidden",
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "ApprovedBy is Required" },
        isNumeric: true,
      },
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "CreatedBy is Required" },
        isNumeric: true,
      },
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "ApprovedAt is Required" },
        isDate: true,
      },
    },
  },
  {
    timestamps: true, // Set to true if you want Sequelize to manage createdAt and updatedAt fields
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at",
    paranoid: true, // Enable soft deletion (deleted_at field)
  }
);
Institution.hasMany(institutionCampusModel, {
  as: "campuses",
  foreignKey: "institution_id",
});
Institution.hasMany(institutionVendorModel, {
  as: "vendors",
  foreignKey: "institution_id",
});
module.exports = {
  Institution: Institution,
  institutionCampus: institutionCampusModel,
  institutionVendor: institutionVendorModel,
  sequelizer: sequelize,
};
