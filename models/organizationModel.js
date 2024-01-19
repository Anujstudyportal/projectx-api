const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Organization = sequelize.define(
  "organizations",
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
        notNull: { msg: "Name is Required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email is Required" },
      },
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile is Required" },
      },
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Country is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "CountryId is Invalid",
        },
      },
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "State is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "StateId is Invalid",
        },
      },
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "City is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "CityId is Invalid",
        },
      },
    },
    contact_person: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notNull: { msg: "Contact Person is Required" },
      },
    },
    cro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Client Relationship Officer is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "CroId is Invalid",
        },
      },
    },
    crm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Client Relationship Officer is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "CroId is Invalid",
        },
      },
    },
    is_student_login: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        notNull: { msg: "is Student Login is Required" },
      },
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["active", "inactive", "blocked", "disabled", "deactivated"],
      validate: {
        notNull: { msg: "Status is Required" },
      },
    },
    is_primary: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    mobile_verified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile Verified At is Pending" },
      },
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Email Verified At is Pending" },
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

module.exports = Organization;
