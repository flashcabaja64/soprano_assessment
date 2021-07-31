require('dotenv').config()

const config = {
    url: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.etmtz.mongodb.net/Cluster0?retryWrites=true&w=majority`
}

module.exports = config;