const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Users = require("../models/user");
const UserService = require("../services/UserService");
const AuthService = require("../services/AuthService");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  for (const field of ['name', 'email', 'password']) {
    if(!req.body[field]) {
      return res.status(400).json({ 
        status: 400, 
        message: `Missing ${field} in request body.` 
      })
    }
  }
  try {
    const passwordValidate = UserService.validatePassword(password)
    
    if(passwordValidate) {
      return res.status(400).json({
        status: 400,
        message: passwordValidate
      })
    }

    let user = await UserService.hasUserWithEmail(email);

    if(user) {
      return res.status(400).json({
        status: 400,
        message: "Email already taken"
      })
    }

    user = new Users({ name, email, password });

    user.password = await UserService.hashPassword(password)

    await user.save()

    const payload = { 
      user: { id: user.id } 
    };

    jwt.sign(
      payload,
      "randomString", {
        expiresIn: 10000
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ 
          token,
          message: "Registration success"
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 500,
      message: 'Error in saving'
    });
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const loginUser = { email, password };

  for(const [key, value] of Object.entries(loginUser)) {
    if(value === null) {
      return res.status(400).json({
        status: 400,
        message: `Missing ${key} in request body`
      })
    }
  }

  try {
    const user = await AuthService.hasUserWithEmail(email);

    if(!user) {
      return res.status(400).json({
        status: 400,
        message: 'Incorrect email or password.'
      })
    }

    const compareMatch = await AuthService.comparePasswords(
      loginUser.password, user.password
    )

    if(!compareMatch) {
      return res.status(400).json({
        status: 400,
        message: 'Incorrect email or password'
      })
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          id: user._id,
          message: 'Login success'
        });
      }
    );
  
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Server Error"
    })
  } 
})

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Users.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;