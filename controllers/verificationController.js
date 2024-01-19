const userModel = require("../models/user/userModel");

// const studentModel = require("../models/studentModel");
const { errorHandler, timezone } = require("../helpers/customHelper");
const sequelize = require("../models");
const { Op } = require("sequelize");

const userForgotRequestModel = require("../models/user/userForgotRequestModel");
const {
  forgotPasswordVerificationSchema,
} = require("../validationSchema/authSchema");

const verificationController = {
  student: async (req, res) => {
    const token = req.params.tokenId;

    try {
    } catch (e) {
      const errors = await errorHandler(e);
      return res.status(401).json({ errors: errors });
    }
  },
  forgotPasswordVerification: async (req, res) => {
    try {
      const { error, value } = forgotPasswordVerificationSchema.validate(
        req.body
      );

      if (error) {
        throw error;
      }

      const currentDateTime = timezone();
      const userInfo = await userModel.findOne(
        {
          attributes: ["id", "email"],
          include: [
            {
              association: "forgotRequest",
              where: { status: "active", code: value.code },
              attributes: [
                "status",
                [
                  sequelize.literal(`(CASE 
                WHEN forgotRequest.status = 'active' AND 
                forgotRequest.expired_at >= '${currentDateTime}' THEN 'used'
                WHEN forgotRequest.expired_at < '${currentDateTime}' THEN 'expired'
                ELSE 'not_used' 
                END)`),
                  "realstatus",
                ],
              ],
            },
          ],
        },
        {
          where: {
            [Op.and]: [
              sequelize.where(sequelize.col("hash_id"), "=", value.token_id),
            ],
          },
        }
      );

      if (!userInfo) {
        return res
          .status(400)
          .json({ is_error: true, errors: [{ message: "Invalid OTP" }] });
      }

      // update status

      const ufrm = {
        status: sequelize.literal(`CASE 
      WHEN status = 'active' AND expired_at >= '${currentDateTime}' THEN 'used'
      WHEN status='active' and expired_at < '${currentDateTime}' THEN 'expired'
      ELSE 'not_used' 
    END`),
      };

      const data = await userForgotRequestModel.update(ufrm, {
        where: {
          user_id: userInfo.id,
          [Op.or]: [
            {
              [Op.and]: [
                { status: "active" },
                { expired_at: { [Op.gte]: currentDateTime } },
              ],
            },
            {
              expired_at: { [Op.lt]: currentDateTime },
            },
          ],
          code: value.code,
        },
      });

      if (userInfo.forgotRequest?.dataValues.realstatus == "expired") {
        return res.status(400).json({
          is_error: true,
          errors: [
            {
              message: "OTP is Expired!",
            },
          ],
        });
      }

      // Reset Password
     
      const resetPassword = {
        password: value.password,
        confirm_password: value.confirm_password,
      };

      await userModel.update(resetPassword, {
        where: { id: userInfo.id },
        individualHooks: true,
      });

      return res.status(200).json({
        is_error: false,
        message: "Verified successfully",
      });
    } catch (e) {
      console.log(e);
      const errors = await errorHandler(e);
      return res.status(400).json({ errors: errors });
    }
  },
};

module.exports = verificationController;
