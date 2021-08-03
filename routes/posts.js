const express = require("express");
//const mongoose = require("mongoose");
//const Grid = require("gridfs-stream");
const Post = require("../models/post");
//const upload = require("../middleware/upload");
//const fs = require('fs');
const router = express.Router();

// let gfs;
// const connection = mongoose.connection;

// connection.once("open", () => {
//     gfs = Grid(connection.db, mongoose.mongo);
//     gfs.collection("image");
// })

router.get("/:id", async (req, res) => {
    try {
        const posts = await Post.find({ id: req.params.id });
        res.status(200).json({ status: 200, posts })
        
    } catch(error) {
        res.status(400).json({ status: 400, message: error.message })
    }
})
.post("/", (req, res) => {
   const post = new Post(req.body)

    post.save()
    .then(() => {
        res.status(200).json({
            status: 200,
            message: "Save successful!"
       })
    })
   .catch(error => res.status(400).json({ status: 400, message: error.message }))
})

router.get("/post/:id", (req, res) => {
    Post.findOne({ _id: req.params.id })
    .then(posts => {
        if(posts) {
            return res.status(200).json({ status: 200, posts })
        } else {
            return res.status(400).json({ status: 400, message: 'No post found.' })
        }
    })
    .catch(error => {
        res.status(400).json({ error })
    })
})
.patch("/:id", (req, res) => {

    Post.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
    .then(posts => {
        if(posts) {
            return res.status(200).json({ status: 200, posts })
        } else {
            return res.status(400).json({ status: 400, message: 'No post found.' })
        }
    })
    .catch(error => {
        res.status(400).json({ status: 400, message: error.message })
    })
})
.delete("/:id", (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then(posts => {
        if(posts) {
            return res.status(200).json({ status: 200, posts })
        } else {
            return res.status(400).json({ status: 400, message: 'No post found.' })
        }
    })
    .catch(error => {
        res.status(400).json({ status: 400, message: error.message })
    })
})


module.exports = router;