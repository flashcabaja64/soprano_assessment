const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.get("/", async (req, res) => {
    // try {
    //     let post = new Post(req.body);
    //     post = await post.save();
    //     res.status(200).json({
    //       status: 200,
    //       data: post,
    //     });
    //   } catch (err) {
    //     res.status(400).json({
    //       status: 400,
    //       message: err.message,
    //     });
    //   }
    res.status(200).json({
        status: 200,
        hello: "yes"
    })
})

module.exports = router;