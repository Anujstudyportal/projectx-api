const jwt = require("jsonwebtoken");
const accessKey = "projectxA05S09K2020";
const refreshKey = "projectxR05S09K2020";
const userTokenModel = require("../models/user/userTokenModel");
const { Op } = require("sequelize");
const { checkTokenFormat } = require("./customHelper");
const authHelper = {
  generateToken: async function (userData, type = "access") {
    let exp = "15m";
    let privateKey = accessKey;
    if (type == "refresh") {
      exp = "25m";
      privateKey = refreshKey;
    }
    const options = { expiresIn: exp };
    const token = jwt.sign({ userData }, privateKey, options);
    return token;
  },
  verifyToken: async function (req, res, next) {
    const token = await checkTokenFormat(req.headers["authorization"]);

    const checkToken = await userTokenModel.findOne({
      where: {
        token: token,
        token_type: "access_token",
      },
    });

    if (checkToken == null) {
      return res.status(401).send({
        message: "Invalid Token",
        status: 401,
      });
    }

    const tokenData = { token_status: "expired" };

    jwt.verify(checkToken.token, accessKey, async (err, decoded) => {
      if (err) {
        if (checkToken.token_status == "active") {
          tokenData.expire_at = err.expiredAt;
          await userTokenModel.update(tokenData, {
            where: { id: checkToken.id },
          });
        }
        return res.status(401).send({
          message:
            err.name == "TokenExpiredError" ? "Token Expired" : "Invalid Token",
          status: 401,
        });
      }
          req.decodeData = decoded;
          next();
    });
  },
  getAccessToken: async function (req, res) {
    const token = await checkTokenFormat(req.headers["authorization"]);

    const checkToken = await userTokenModel.findOne({
      where: {
        token: token,
        token_type: "refresh_token",
      },
    });
    if (checkToken == null) {
      return res.status(401).send({
        message: "Invalid Token",
        status: 401,
      });
    }
    // check verify Token if it is not expired then it return generate and return new access token
    const tokenData = { token_status: "expired" };
    return jwt.verify(checkToken.token, refreshKey, async (err, decoded) => {
      if (err) {
        tokenData.expire_at = err.expiredAt;
        await userTokenModel.update(tokenData, {
          where: {
            token_status: "active",
            expire_at: null,
            [Op.or]: [
              { user_id: checkToken.user_id },
              { token_type: "access_token" },
            ],
          },
        });

        return res.status(401).send({
          message:
            err.name == "TokenExpiredError" ? "Token Expired" : "Invalid Token",
          status: 401,
        });
      }

      return decoded;
    });
  },
};

module.exports = authHelper;