const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require('dotenv').config();

const mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.etmtz.mongodb.net/Cluster0?retryWrites=true&w=majority`
const storage = new GridFsStorage({
  url: mongoURL,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg", "image/jpeg"];
  
    if(match.indexOf(file.mimetype) === 1) {
      const filename = `${Date.now()}_${file.originalname}`
      return filename
    }

    return {
      bucketName: "image",
      filename: `${Date.now()}_${file.originalname}`
    }
  }
})

module.exports = multer({ storage })