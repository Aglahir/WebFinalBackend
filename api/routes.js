const express = require("express");
const fs = require("fs");
const path = require("path");
const baseDir = __dirname;
const basename = path.basename(__filename);
const cors = require("../middleware/cors");

//const validatePermissions = require("./middleware/ValidatePermissions");

function eRoutes(db) {
  const tokenValidation = require("../middleware/TokenValidation")(db);
  const router = express.Router();
  console.log(baseDir);

  router.use(cors);
  router.use("/:route", [tokenValidation]);

  router.use((req, res, next) => {
    console.log(req.sessiontoken);

    next();
  });

  // Import all api routes
  fs.readdirSync(__dirname).forEach((dir) => {
    if (dir !== basename)
      fs.readdirSync(__dirname + "/" + dir)
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
