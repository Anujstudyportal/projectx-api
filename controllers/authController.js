const userModel = require("../models/user/userModel");
const userTokenModel = require("../models/user/userTokenModel");
const userForgotRequestModel = require("../models/user/userForgotRequestModel");
const bcrypt = require("bcrypt");
const authHelper = require("../helpers/authHelper");
const {
  errorHandler,
  timezone,
  generateOTP,
} = require("../helpers/customHelper");
const { auth_lang } = require("../lang/english");
const { createHash } = require("../helpers/cryptHelper");
const {
  loginSchema,
  forgotPasswordSchema,
} = require("../validationSchema/authSchema");

const authController = {
  login: async (req, res, next) => {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        throw error;
      }
      const data = await userModel.findOne({
        where: { email: value.email },
      });

      let userData = {};
      if (data != null) {
        if (data.status == "blocked") {
          throw new Error(auth_lang.user_account_blocked);
        }
        if (data.status == "not_verified") {
          throw new Error(auth_lang.user_account_not_verified);
        }

        const match = await bcrypt.compare(value.password, data.password);

        if (match) {
          // Prepare data
          userData.id = data.id;
          userData.email = data.email;
          userData.role_id = data.default_role_id;
          userData.name = data.first_name + " " + data.last_name;

          const accessToken = await authHelper.generateToken(
            userData,
            "access"
          );
          if (accessToken.length > 0) {
            await userTokenModel.create({
              token: accessToken,
              user_id: userData.id,
            });
          }

          const refreshToken = await authHelper.generateToken(
            userData,
            "refresh"
          );
          if (refreshToken.length > 0) {
            await userTokenModel.create({
              token: refreshToken,
              token_type: "refresh_token",
              user_id: userData.id,
            });
          }
  
          return res.status(200).send({
            data: userData,
            token: { accessToken: accessToken, refreshToken: refreshToken },
            message: auth_lang.user_login_successfully,
            status: 200,
          });
        } else {
          throw new Error(auth_lang.user_incorrect_password);
        }
      } else {
        throw new Error(auth_lang.user_account_not_exist);
      }
    } catch (e) {
      console.log(e);
      const errors = await errorHandler(e);
      return res.status(401).json({ errors: errors, is_error: true });
    }
  },
  logout: async (req, res) => {
    return await authHelper.destroyToken(req, res);
  },
  forgotPassword: async (req, res, next) => {
    try {
      const { error, value } = forgotPasswordSchema.validate(req.body);
      if (error) {
        throw error;
      }

      const data = await userModel.findOne({
        attributes: ["id", "email", "first_name"],
        where: { email: value.email },
      });

      if (data == null) {
        throw new Error(auth_lang.user_account_not_exist);
      }

      const token_id = await createHash({ id: data.id, email: data.email });
      const otp = await generateOTP();

      const userPasswordData = { user_id: data.id, code: otp };

      const updateData = { status: "not_used" };
      const t = await userForgotRequestModel.update(updateData, {
        where: { status: "active", user_id: data.id },
      });

      await userForgotRequestModel.create(userPasswordData);

      /**************** POSTMARK INTEGRATION *****************/

      // const mailVariables = [
      //   { label: "%NAME%", value: data.first_name },
      //   { label: "%CODE%", value: otp },
      // ];

      // await postmarkObj.sendEmail(
      //   req.body.email,
      //   "Forgot Password",
      //   "forgotPassword",
      //   mailVariables
      // );

      /**************** POSTMARK INTEGRATION *****************/

      return res.status(200).send({
        is_error: false,
        token_id: token_id,
        message: auth_lang.received_reset_link,
      });
    } catch (e) {
      const errors = await errorHandler(e);
      return res.status(400).json({ errors: errors, is_error: true });
    }
  },

  getAccessToken: async (req, res, next) => {
    try {
      const userData = await authHelper.getAccessToken(req, res, next);
      if (userData) {
        const accessToken = await authHelper.generateToken(userData, "access");
        if (accessToken.length > 0) {
          const updateData = {
            expire_at: timezone(userData.exp),
            token_status: "expired",
          };

          await userTokenModel.update(updateData, {
            where: {
              token_type: "access_token",
              expire_at: null,
              user_id: userData.userData.id,
            },
          });

          await userTokenModel.create({
            token: accessToken,
            user_id: userData.userData.id,
          });
        }
        return res.status(200).send({
          is_error: false,
          token: { accessToken: accessToken },
          message: auth.access_token_regenerated,
          status: 200,
        });
      }
    } catch (e) {
      return res.status(500).send({
        is_error: true,
        message: e.message,
        status: 500,
      });
    }
  },
};

module.exports = authController;
