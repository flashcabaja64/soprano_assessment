const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    description: { type: String },
    image: { type: String },
    fileName: { type: String },
    id: { type: String }
}, { 
    timestamps: true 
})
//image: { data: Buffer, contentType: String }

module.exports = mongoose.model("Post", postSchema);