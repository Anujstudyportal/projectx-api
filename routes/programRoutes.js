module.exports = (router) => {
  const programController = require("../controllers/inventory/programController");

  router.get("/", programController.getAll);
  router.post("/add", programController.addProgram);
  router.put("/edit/:id", programController.updateProgram);

  return router;
};
