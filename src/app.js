const cors = require("cors");
const express = require("express");
const userRouter = require("../routes/users");
const postRouter = require("../routes/posts");
const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: '16mb', extended: true }));
app.use(express.json({ limit: '16mb', extended: true }));

app.use("/user", userRouter)
app.use("/posts", postRouter)

// app.use(function errorHandler(error, req, res, next) {
//   let response;
//   if (NODE_ENV === 'production') {
//     response = { error: { message: 'server error' } };
//   } else {
//     console.error(error);
//     response = { message: error.message, error };
//   }
//   res.status(500).json(response);
// });

module.exports = app;