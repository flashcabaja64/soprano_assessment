const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        author: { type: String }
    },
    { timestamp: true }
)

const post = mongoose.model("post", postSchema);

module.exports = post;