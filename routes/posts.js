const express = require("express");
const Post = require("../models/post");
const router = express.Router();

router.get("/", (req, res) => {
    Post.find().then(posts => {
        res.status(200).json({ status: 200, posts })
    })
    .catch(error => {
        res.status(400).json({ status: 400, message: error.message })
    })
})
.post("/", (req, res) => {
    /*
        image, title, description
    */
   const post = new Post(req.body)

    post.save()
    .then(() => {
        res.status(201).json({
            status: 200,
            message: "Save successful!"
       })
    })
   .catch(error => res.status(400).json({ status: 400, message: error.message }))
})

router.get("/:id", (req, res) => {
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