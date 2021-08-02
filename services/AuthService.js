const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require("../models/user");
require('dotenv').config();

const AuthService = {
  hasUserWithEmail(email) {
    return Users.findOne({ email })
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      subject,
      expiresIn: config.JWT_EXPIRY,
      algorithm: 'HS256',
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },
};

module.exports = AuthService;