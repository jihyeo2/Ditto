const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  let token = null;
  function getToken() {
    token = req.header("x-auth-token");
    console.log("got the token", token);
  }

  function getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!token) {
          console.log("no token");
          return res
            .status(401)
            .send({ error: "Access denied. No token provided." });
        }
        try {
          const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
          req.user = decoded;
          next();
        } catch (err) {
          res.status(400).send({ error: "Invalid token." });
        }
      }, 3000);
    });
  }

  try {
    const a = await getToken();
    const b = await getUser();
  } catch (ex) {
    console.log(ex);
  }
};

//TODO: async await function does not work, gotta find better way rather than setTimeOut
