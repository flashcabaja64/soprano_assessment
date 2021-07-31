const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        title: { type: String },
        description: { type: String }
        
    },
    { timestamp: true }
)
//image: { data: Buffer, contentType: String }

module.exports = mongoose.model("Post", postSchema);