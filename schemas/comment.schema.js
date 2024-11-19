const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  created_date: {
    type: Date, 
    default: Date.now
  }
})

module.exports = mongoose.model("Comments", commentSchema)