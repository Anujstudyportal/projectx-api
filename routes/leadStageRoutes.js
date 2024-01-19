module.exports = (router) => {
  const leadStageController = require("../controllers/leadStageController");

  router.get("/", leadStageController.getAll);
  router.post("/add", leadStageController.addLeadStage);
  router.put("/edit/:id", leadStageController.updateLeadStage);
  return router;
};
