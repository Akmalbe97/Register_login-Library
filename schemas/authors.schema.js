const { Schema, model } = require("mongoose");

const authorSchemas = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15
    },
    last_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15
    },
    date_of_birth: {
      type: Number,
      required: true,
      minlength: 2,
      maxlength:4
    },
    date_of_death: {
      type: Number,
      required: true,
      minlength: 2,
      maxlength:4
    },
    country: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100
    },
    works:{
      type: String,
      required: true,
      minlength: 6,
      maxlength: 400
    },
    image: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const AuthorsSchemas = model("Authors", authorSchemas);

module.exports = AuthorsSchemas;
