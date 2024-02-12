const { DataTypes } = require("sequelize");
const sequelize = require("../index");
const bcrypt = require("bcrypt");

// Models
const userRolesModel = require("../user/userRolesModel");
const userPermissionsModel = require("../user/userPermissionsModel");
const userForgotRequestModel = require("./userForgotRequestModel");

const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Auto-increment primary key
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "First Name is Required" },
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Last Name is Required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Email is Required" },
      },
    },
    mobile_country_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Mobile Country Code is Required" },
        isDecimal: { msg: "only Number is Required" },
        len: { args: [1, 3], msg: "Max Length is 3" },
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
    default_role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "not_verified",
      values: ["not_verified", "active", "inactive"],
    },
    organization_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Organization is Required" },
        isNumeric: true,
        min: {
          args: [1],
          msg: "organizationId is Invalid",
        },
      },
    },
    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      defaultValue: "male",
      values: ["male", "female", "other"],
      validate: {
        notNull: { msg: "Gender is Required" },
      },
    },
    martial_status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["unmarried", "married"],
      defaultValue: "unmarried",
      validate: {
        notNull: { msg: "Martial Status is Required" },
      },
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: { msg: "DOB is Required" },
      },
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    mobile_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    last_login_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    type: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["student", "partner", "staff"],
      defaultValue: "student",
      validate: { notNull: { msg: "Type is Required" } },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Password is Required" },
        len: {
          args: [8, 255],
          msg: "Password Must be enter atleast 8 characters",
        },
        is: {
          args: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/,
          msg: "Enter at least one letter, one number and one special character",
        },
      },
    },
    primary_country_code: {
      type: DataTypes.VIRTUAL,
    },
    primary_mobile: {
      type: DataTypes.VIRTUAL,
    },
    confirm_password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull: { msg: "Confirm Password is Required" },
        isConfirmed(value) {
          if (this.password !== value) {
            throw new Error("Password and confirm password does not match.");
          }
        },
      },
    },
    hash_id: {
      type: DataTypes.VIRTUAL,
      get: function () {
        const sha1_user_id = sequelize.fn("SHA1", sequelize.col("id"));
        const sha1_email = sequelize.fn("SHA1", sequelize.col("email"));
        return sequelize.fn(
          "MD5",
          sequelize.fn("CONCAT", sha1_user_id, "-", sha1_email)
        );
      },
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true, // Enable soft delete
    hooks: {
      beforeValidate: (user) => {
        // Set mobile to primary _mobile if it exists
        if (user.primary_country_code) {
          user.mobile_country_code = user.primary_country_code;
        }
        if (user.primary_mobile) {
          user.mobile = user.primary_mobile;
        }
      },
      beforeCreate: async (user) => {
        user.password = await hashPassword(user.password);
      },
      beforeUpdate: async (user) => {
        // Hash the password before updating the user
        if (user.changed("password")) {
          user.password = await hashPassword(user.password);
        }
      },
    },
  }
);

// async function hashPassword(password) {
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     return hashedPassword;
//   } catch (error) {
//     // console.error("Error hashing password:", error.message);
//     throw new Error("Error hashing password.");
//   }
// }

// Users.hasMany(userRolesModel, {
//   as: "roles",
//   foreignKey: "user_id",
// });
// Users.hasOne(userForgotRequestModel, {
//   as: "forgotRequest",
//   foreignKey: "user_id",
  
// });

module.exports = Users;