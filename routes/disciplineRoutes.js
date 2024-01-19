module.exports = (router) => {
  const disciplineController = require("../controllers/disciplineController");
  router.get("/", disciplineController.getAll);
  router.post("/add", disciplineController.addDiscipline);
  router.put("/edit/:id", disciplineController.updateDiscipline);
  return router;
};
