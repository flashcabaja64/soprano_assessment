const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const postRouter = require("../routes/posts");
const connectDB = require('./db');

const app = express();
connectDB();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/posts", postRouter)

app.listen(8080, function () {
    console.log("Runnning on " + 8080);
});

module.exports = app;