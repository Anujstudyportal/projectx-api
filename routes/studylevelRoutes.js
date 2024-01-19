module.exports = (router) => {
  const studylevelController = require("../controllers/studylevelController");

  router.get("/", studylevelController.getAll);
  router.post("/add", studylevelController.addStudylevel);
  router.put("/edit/:id", studylevelController.updateStudylevel);
  return router;
};
