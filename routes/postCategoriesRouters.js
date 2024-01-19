module.exports = (router) => {
    const postCategoriesController = require("../controllers/postCategoriesController.js");
    router.get("/", postCategoriesController.getAll);
    router.post("/add", postCategoriesController.addPost);
    router.put("/edit/:id", postCategoriesController.updatePost);
    router.delete("/del/:id", postCategoriesController.removePost);
  
    return router;
  };