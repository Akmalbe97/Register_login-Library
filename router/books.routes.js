const { Router } = require("express");
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getOneBook,
  search,
} = require("../controller/books.controller");
const checkAdmin = require("../middleware/admin.middleware");
const { bookValidate } = require("../middleware/book.validate.middleware");

const bookRouter = Router();

bookRouter.get("/get_books", getBooks);
bookRouter.get("/get_one_book/:id", getOneBook);
bookRouter.get("/search/:title", search);
bookRouter.post("/add_book", bookValidate, checkAdmin, addBook);
bookRouter.put("/update_book/:id", bookValidate, checkAdmin, updateBook);
bookRouter.delete("/delete_book/:id",checkAdmin, deleteBook);

module.exports = bookRouter;
