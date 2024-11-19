const { Router } = require("express");
const {
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  getOneAuthors,
} = require("../controller/authors.controller");
const checkAdmin = require("../middleware/admin.middleware");
const uploadImage = require("../middleware/uploadImage")
const { authorValidate } = require("../middleware/author.validate.miidleware");
const verifyRefreshToken = require("../middleware/refreshToken.middleware");
const authorRouter = Router();

authorRouter.get("/get_authors", getAuthors);
authorRouter.get("/get_one_author/:id",  getOneAuthors);
authorRouter.post("/add_author", [verifyRefreshToken, authorValidate, checkAdmin], addAuthor);
authorRouter.post("/add_image", uploadImage.single("image", uploadImage))
authorRouter.put("/update_author/:id", [authorValidate, checkAdmin], updateAuthor);
authorRouter.delete("/delete_author/:id", checkAdmin, deleteAuthor);

module.exports = authorRouter;
