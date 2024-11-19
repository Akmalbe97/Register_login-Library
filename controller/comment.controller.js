const CommentSchema = require("../schemas/comment.schema");
const AuthorSchemas = require("../schemas/authors.schema");

const addComment = async (req, res, next) => {
  try {
    const {authorId, text} = req.body

    const exsistAuthor = await AuthorSchemas.findById(authorId)
    if(!exsistAuthor) {
      return res.status(404).json({
        message: "author not found"
      })
    }

    const newComment = await CommentSchema.create({authorId, text})

    res.satus(201).json({
      message: "successfully added comment"
    })
  }catch(error) {
    next (error)
  }
}

const likeComment = async (req, res, next) => {
  try {
    const {id} = req.params;

    const foundComment = await CommentSchema.findById(id)

    foundComment.likes += 1
    await foundComment.save()

    res.status(201).json({
      message: "commend liked successfully",
      likes: foundComment.likes
    })
  }catch(error) {
    next (error)
  }
}

module.exports = {
  addComment,
  likeComment
}