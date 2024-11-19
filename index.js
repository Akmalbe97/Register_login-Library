const express = require("express");
const cors = require("cors");
const connectDB = require("./db/config.db");
const bookRouter = require("./router/books.routes");
const cookieParser = require("cookie-parser");
const authorRouter = require("./router/authors.routes");
const authRouter = require("./router/auth.routes");
const commentRouter = require("./router/comment.routes")
const path = require("path");

const app = express();



app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

connectDB()


app.use(bookRouter);
app.use(authorRouter);
app.use(authRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(commentRouter)
app.listen(PORT, () => {
  console.log(`Server is running on the port:${PORT}`);
});
