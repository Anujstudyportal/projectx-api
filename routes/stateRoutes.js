module.exports = (router) => {
  const stateController = require("../controllers/stateController");

  router.get("/", stateController.getAll);
  router.post("/add", stateController.addState);
  router.put("/edit/:id", stateController.updateState);

  return router;
};
