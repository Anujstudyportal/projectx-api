module.exports = (router) => {
  const intakeController = require("../controllers/intakeController");

  router.get("/", intakeController.getAll);
  router.post("/add", intakeController.addIntake);
  router.put("/edit/:id", intakeController.updateIntake);

  return router;
};
