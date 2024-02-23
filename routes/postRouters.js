module.exports = (router) => {
  const postController = require("../controllers/postController.js");
  router.get("/", postController.getAll);
  router.post("/add", postController.addPost);
  router.put("/edit/:id", postController.updatePost);
  router.delete("/del/:id", postController.removePost);
  router.post("/img_upload",upload.single("file"), postController.imgUploadPost);

  return router;
};