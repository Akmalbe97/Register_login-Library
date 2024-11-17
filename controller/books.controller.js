const BooksSchemas = require("../schemas/books.schema");

const getBooks = async (req, res, next) => {
  try {
    const books = await BooksSchemas.find().populate("author_info", "-placeOfBirth -works -_id -DayOfDied -creativity -dateOfBirth");
    res.json(books);
  } catch (err) {
    next(err);
  }
};

const addBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      rate,
      page,
      publish,
      genre,
      publishHome,
      description,
      author_info,
      era
    } = req.body;

    await BooksSchemas.create({
      title,
      author,
      rate,
      page,
      publish,
      genre,
      publishHome,
      description,
      author_info,
      era
    });
    res.json({
      message: "Added new book",
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      author,
      rate,
      page,
      publish,
      genre,
      publishHome,
      description,
      author_info,
      era
    } = req.body;

    const foundedBook = await BooksSchemas.findById(id);
    if (!foundedBook) {
      res.json({
        message: "Book not founded",
      });
    }

    let result = await BooksSchemas.findByIdAndUpdate(
      id,
      {
        title,
        author,
        rate,
        page,
        publish,
        genre,
        publishHome,
        description,
        author_info,
        era
      },
      { new: true }
    );

    res.json({
      message: "Updated a book",
      result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await BooksSchemas.findById(id);
    if (!foundedBook) {
      res.json({
        message: "Book not founded",
      });
    }

    await BooksSchemas.findByIdAndDelete(id);

    res.json({
      message: "Deleted a book",
    });
  } catch (err) {
    next(err);
  }
};

const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const foundedBook = await BooksSchemas.findById(id);
    if (!foundedBook) {
      res.json({
        message: "Book not founded",
      });
    }
    res.json(foundedBook);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const {title} = req.query
    const searchResult = await BooksSchemas.find({
      title: {$regex: title}
    })
    res.json(searchResult);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
  getOneBook,
  search
};
