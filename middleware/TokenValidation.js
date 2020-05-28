const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config");

function TokenValidation(req, res, next) {
  let route = req.params.route;
  console.log(route);

  if (route == "login") {
    next();
  } else {
    const { sessiontoken } = req.headers;

    if (!sessiontoken) {
      res.statusMessage = "Missing header 'sessiontoken'";
      return res.status(401).end();
    }

    jwt.verify(sessiontoken, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        res.statusMessage = "Session expired";
        return res.status(400).end();
      } else {
        req.sessiontoken = decoded;
        next();
      }
    });
  }
}

module.exports = TokenValidation;
