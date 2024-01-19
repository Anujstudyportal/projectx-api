module.exports = (router) => {
  const studentController = require("../controllers/studentController");
  router.post("/add", studentController.addStudent);
  return router;
};
