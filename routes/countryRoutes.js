
module.exports = (router) => {
  const { checkPermission } = require("../controllers/permissionController");
  const countryController = require("../controllers/countryController");
  router.get("/",checkPermission("country.list"), countryController.getAll);
  router.post("/add", countryController.addCountry);
  router.put("/edit/:id", countryController.updateCountry);
  return router;
};
