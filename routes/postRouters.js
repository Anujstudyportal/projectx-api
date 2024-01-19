module.exports = (router) => {
  const postController = require("../controllers/postController.js");
  router.get("/", postController.getAll);
  router.post("/add", postController.addPost);
  router.put("/edit/:id", postController.updatePost);
  router.delete("/del/:id", postController.removePost);

  return router;
};