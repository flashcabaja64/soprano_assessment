const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
/*
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://yangster:PxXfF4zjlorC4fS3@cluster0.etmtz.mongodb.net/Cluster0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/