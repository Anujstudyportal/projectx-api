const roleModel = require("../models/user/roleModel");
const leadModel = require("../models/leadModel");
const userModel = require("../models/user/userModel");
const userRoleModel = require("../models/user/userRolesModel");
// const studentModel = require("../models/studentModel");

const postmark = require("../library/postmark");
const { errorHandler } = require("../helpers/customHelper");
const sequelize = require("../models");
const { SHA1 } = require("crypto-js");

const studentController = {
  student: async (req, res) => {
    const postData = req.body;
    try {
      const transaction = await sequelize.transaction();
      try {
        const userResult = await userModel.create(postData, {
          transaction: transaction,
        });

        const studentRole = await roleModel.findOne({
          where: { unique_string: "student" },
          transaction: transaction,
        });

        await userRoleModel.create(
          {
            user_id: userResult.id,
            role_id: studentRole.id,
          },
          { transaction: transaction }
        );

        await leadModel.create(postData, { transaction: transaction });

        // dummy link
        const link = "https://app.dfavo.com?id=" + SHA1(req.body.email);

        const mailVariables = [
          { label: "%NAME%", value: req.body.first_name },
          { label: "%LINK%", value: link },
        ];

        // const postmarkMail = await postmark.sendEmail(
        //   req.body.email,
        //   "Student Email Verification",
        //   "studentVerification",
        //   mailVariables
        // );

        await transaction.commit();
        res.status(201).send(userResult);
      } catch (e) {
        if (transaction) {
          await transaction.rollback();
        }
        const errors = await errorHandler(e);
        return res.status(400).json({ errors: errors });
      }
    } catch (err) {
      const errors = await errorHandler(err);
      return res.status(400).json({ errors: errors });
    } finally {
      await sequelize.close();
    }
  },
};

module.exports = studentController;
