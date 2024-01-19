module.exports = (router) => {
  const vendorController = require("../controllers/vendorController");

  router.get("/", vendorController.getAll);
  router.post("/add", vendorController.addVendor);
  router.put("/edit/:id", vendorController.updateVendor);
  return router;
};
