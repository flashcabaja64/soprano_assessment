const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());

app.post("/register", async (request, response) => {});
app.post("/login", async (request, response) => {});