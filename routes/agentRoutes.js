module.exports = (router) => {
  const agentController = require("../controllers/agentController");
  router.get("/", agentController.getAll);
  router.post("/add", agentController.addAgent);
  router.put("/edit/:id", agentController.updateAgent);

  return router;
};
