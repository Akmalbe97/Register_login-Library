const {Schema, model} = require("mongoose")

const authSchema = new Schema ({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum:{
      values: ["user", "admin", "superAdmin"],
      message: "{VALUE} boshqa role talab qilinadi"
    }
  },
  verify_code: {
    type: String
  },

  verify: {
    type: Boolean,
    default: false,
  }
},
{
  versionKey: false,
  timestamps: true
})

module.exports = model("Auth", authSchema)