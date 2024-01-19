module.exports = (router) => {
  const permissionController = require("../controllers/permissionController");
  router.get("/", permissionController.getAll);
  router.post("/add", permissionController.addPermission);
  router.put("/edit/:id", permissionController.updatePermission);

  return router;
};
