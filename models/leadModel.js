const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Leads = sequelize.define(
  "leads",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: { msg: "First Name is Required" },
        is: { args: /^[a-zA-Z ]*$/, msg: "Only Aplha Space is Required" },
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "Dob is Required" },
        isDate: true,
      },
    },
    primary_country_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile Country Code is Required" },
        isDecimal: { msg: "only Number is Required" },
        len: { args: [1, 3], msg: "Max Length is 3" },
      },
    },
    primary_mobile: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: { notNull: { msg: "Mobile is Required" } },
    },
    alternate_mobile: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: "Email is Required" },
        isEmail: { msg: "Invalid Email" },
      },
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other", "none"),
      allowNull: true,
      defaultValue: "none",
    },
    marital_status: {
      type: DataTypes.ENUM("married", "unmarried"),
      allowNull: true,
      defaultValue: "unmarried",
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "Country is Required" } },
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "State is Required" } },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "City is Required" } },
    },
    organization_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: { notNull: { msg: "Organization is Required" } },
    },
    lead_source_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lead_stage_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    utm_source_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    higher_education_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "Education is Required" } },
    },
    discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "Discipline is Required" } },
    },
    destination_country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notNull: { msg: "Destination Country is Required" } },
    },
    english_testscore: {
      type: DataTypes.JSON,
      allowNull: true,
      // validate: { notNull: { msg: "Testscore is Required" } },
    },
    is_whatsapp_active: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
    utm_source: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    converted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  }
);

module.exports = Leads;
