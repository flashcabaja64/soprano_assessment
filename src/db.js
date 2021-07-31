const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
  try {
    const config = {
      url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.etmtz.mongodb.net/Cluster0?retryWrites=true&w=majority`
    }
  
    const options = {
      keepAlive: 1,
      connectTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    };
  
    await mongoose.connect(config.url, options)
    console.log('Database connection established')
  } catch (err) {
    console.error(err)
  }
}

module.exports = connectDB;