const cors = require("cors");
const express = require("express");
const userRouter = require("../routes/users");
const postRouter = require("../routes/posts");
const connectDB = require('./db');

const app = express();
connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/register", userRouter)
app.use("/posts", postRouter)

app.listen(8080, () => {
    console.log("Runnning on " + 8080);
});

module.exports = app;