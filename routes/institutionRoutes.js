module.exports = (router) => {
  const institutionController = require("../controllers/inventory/institutionController");

  router.get("/", institutionController.getAll);
  router.post("/add", institutionController.addInstitution);
  router.put("/edit/:id", institutionController.updateInstitution);
  return router;
};
