const Joi = require("joi");

const authSchema = {
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/
        )
      )
      .min(8)
      .max(255)
      .required()
      .messages({
        "string.pattern.base":
          "The new password must contain at least one letter, one digit, and one special character.",
      }),
  }),
  forgotPasswordSchema: Joi.object({
    email: Joi.string().email().required(),
  }),
  forgotPasswordVerificationSchema: Joi.object({
    token_id: Joi.string().required(),
    code: Joi.string().regex(/^\d+$/).min(6).max(6).required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/
        )
      )
      .min(8)
      .max(255)
      .required()
      .messages({
        "string.pattern.base":
          "The new password must contain at least one letter, one digit, and one special character.",
      }),
    confirm_password: Joi.string()
      .valid(Joi.ref("password"))
      .required()
      .messages({
        "any.only": "The passwords do not match.",
      }),
  }),
};

module.exports = authSchema;
