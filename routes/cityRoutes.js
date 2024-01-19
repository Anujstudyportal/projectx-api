module.exports = (router) => {
  const cityController = require("../controllers/cityController");
  router.get("/", cityController.getAll);
  router.post("/add", cityController.addCity);
  router.put("/edit/:id", cityController.updateCity);
  return router;
};
