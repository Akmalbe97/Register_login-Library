const { Schema, model } = require("mongoose");

const bookSchemas = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title kiritish zarur!"],
      set: (value) => value.trim().toUpperCase(),
    },
    author: {
      type: String,
      required: [true, "Authors kiriting pls"],
      set: (value) => value.trim().toUpperCase(),
    },
    rate: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
      min: [12, "12 betdan oz kitob qabul qilinmaydi"],
      max: [800, "800 betdan ko'p kitob qabul qilinmaydi"],
    },
    publish: {
      type: String,
      required: true,
      minlength: [30, "30 Harfdan ko'proq kiriting!"],
    },
    genre: {
      type: String,
      required: true,
      enum: {
        values: [
          "fantastic",
          "dramma",
          "historical",
          "roman",
          "comedy",
          "detectiv",
        ],
        message: "{VALUE} bunday janr mavjud emas!",
      },
    },
    publishHome: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [100, "Kitob haqida ko'proq ma'lumot kiriting!"],
    },
    author_info: {
      type: Schema.Types.ObjectId,
      ref: "Authors",
      required: true,
    },
    era: {
      type: String,
      required: true,
      enum: {
        values: [
          "Temuriylar davri",
          "Jadid davri",
          "Sovet davri",
          "Mustaqillik davri",
        ],
        message: "{VALUE} bunday davr mavjud emas!",
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BooksSchemas = model("Books", bookSchemas);

module.exports = BooksSchemas;
