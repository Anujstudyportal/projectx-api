module.exports = (router) => {
  const authHelper = require("../helpers/authHelper");
  const authController = require("../controllers/authController");
  const verificationController = require("../controllers/verificationController");

  router.post("/login", authController.login);
  router.get("/logout", authHelper.verifyToken, authController.logout);
  router.get("/get_access_token", authController.getAccessToken);
  router.post("/forgot_Password", authController.forgotPassword);
  router.post("/reset_password", verificationController.forgotPasswordVerification);

  return router;
};
