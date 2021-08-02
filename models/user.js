const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//name, email, password, image
const usersSchema = new Schema({
  name: { 
    type: String,
    required: true
  },
  email: { 
    type: String,
    required: true
  },
  password: { 
    type: String,
    required: true
  }
  },{ 
  timestamp: true 
})
//image: { data: Buffer, contentType: String }

module.exports = mongoose.model("Users", usersSchema);