module.exports = (router) => {
  const signupController = require("../controllers/signupController");

  router.post("/student", signupController.student);
  // router.post("/recruiter", signupController.studentSignup);

  return router;
};
