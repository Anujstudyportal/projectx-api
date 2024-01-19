module.exports = (router) => {
  const testscoreController = require("../controllers/testscoreController");

  router.get("/", testscoreController.getAll);
  router.post("/add", testscoreController.addTestscore);
  router.put("/edit/:id", testscoreController.updateTestscore);
  return router;
};
