const {Router} = require("express")
const {addComment, likeComment} = require("../controller/comment.controller")

commentRouter = Router()

commentRouter.post("/add_comment", addComment)
commentRouter.post("/like/:id", likeComment)

module.exports = commentRouter