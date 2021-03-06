const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ 
    status: 401,
    message: "Auth Error" 
  });

  try {
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ 
      status: 500,
      message: "Invalid Token" 
    });
  }
};