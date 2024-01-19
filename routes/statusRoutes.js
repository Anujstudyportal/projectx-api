module.exports = (router) => {
  const statusController = require("../controllers/statusController");

  router.get("/", statusController.getAll);
  router.post("/add", statusController.addStatus);
  router.put("/edit/:id", statusController.updateStatus);

  return router;
};
