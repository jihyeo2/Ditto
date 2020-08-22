const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async function (req, res, next) {
  const token = await req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    console.log("decoding token started");
    const decoded = jwt.verify(token, config.get("jwtPrivateKey")); //decoded payload if valid
    req.user = decoded;
    console.log("auth here it is");
    next();
  } catch (ex) {
    res.status(400).send("Invalid token."); // this automatically terminates the call
  }
};
