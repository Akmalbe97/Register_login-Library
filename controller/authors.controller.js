const AuthorsSchemas = require("../schemas/authors.schema");

const getAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorsSchemas.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const addAuthor = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      day_of_death,
      country,
      bio,
      works,
    } = req.body;

    const image = req.file ? req.file.path : null;

    await AuthorsSchemas.create({
      first_name,
      last_name,
      date_of_birth,
      day_of_death,
      country,
      bio,
      works,
      image,
    });
    res.json({
      message: "Added new author",
    });
  } catch (err) {
    next(err);
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      date_of_birth,
      day_of_death,
      country,
      bio,
      works,
    } = req.body;

    const foundedAuthor = await AuthorsSchemas.findById(id);
    if (!foundedAuthor) {
      res.json({
        message: "Author not founded",
      });
    }

    let result = await AuthorsSchemas.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        date_of_birth,
        day_of_death,
        country,
        bio,
        works,
      },
      { new: true }
    );

    res.json({
      message: "Updated a author",
      result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorsSchemas.findById(id);
    if (!foundedAuthor) {
      res.json({
        message: "Author not founded",
      });
    }

    await AuthorsSchemas.findByIdAndDelete(id);

    res.json({
      message: "Deleted a author",
    });
  } catch (err) {
    next(err);
  }
};

const getOneAuthors = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorsSchemas.findById(id);
    if (!foundedAuthor) {
      res.json({
        message: "Author not founded",
      });
    }
    const authors = await AuthorsSchemas.findOne({ _id: id });
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAuthors,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  getOneAuthors,
};
