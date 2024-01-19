module.exports = (router) => {
  const leadSourceController = require("../controllers/leadSourceController");

  router.get("/", leadSourceController.getAll);
  router.post("/add", leadSourceController.addLeadSource);
  router.put("/edit/:id", leadSourceController.updateLeadSource);

  return router;
};
