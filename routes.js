const express = require("express");
const fs = require("fs");
const path = require("path");
const baseDir = __dirname + "\\api";
const basename = path.basename(baseDir);
const cors = require("./middleware/cors");
const tokenValidation = require("./middleware/TokenValidation");
//const validatePermissions = require("./middleware/ValidatePermissions");

function eRoutes(db) {
  const router = express.Router();

  router.use(cors);
  router.use("/:route", [tokenValidation]);

  router.use((req, res, next) => {
    console.log(req.sessiontoken);

    next();
  });

  // Import all api routes
  fs.readdirSync(basename).forEach((dir) => {
    fs.readdirSync(baseDir + "\\" + dir)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-9) === "routes.js"
        );
      })
      .forEach((file) => {
        router.use("/" + dir, require(path.join(baseDir, dir, file))(db));
      });
  });
  return router;
}

module.exports = eRoutes;
