const { Schema, model } = require("mongoose");

const registerSchemas = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    last_name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 15,
    },
    phone: {
      type: Number,
      required: true,
      validate: {
        validator: function(value) {
          return value.toString().length <= 9;
        },
        message: " Telefon raqami 8 ta raqamdan oshmasligi kerak"
      }
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["user", "admin"]
    }
    
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const RegisterSchemas = model("Register", registerSchemas);

module.exports = RegisterSchemas;
