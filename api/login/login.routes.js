module.exports = function (db) {
  const router = require("express").Router({ mergeParams: true });
  const jsonParser = require("body-parser").json();
  const bcryptjs = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  const { SECRET_TOKEN } = require("../../config");

  router.post("/", jsonParser, (req, res) => {
    let { user_name, password } = req.body;
    if (!user_name || !password) {
      res.statusMessage = "Parameter missing in the body of the request.";
      return res.status(400).end();
    }

    db.users
      .getUserByUsername(user_name)
      .then((user) => {
        if (user) {
          bcryptjs
            .compare(password, user.password)
            .then((result) => {
              if (result) {
                let userData = {
                  _id: user._id,
                };
                jwt.sign(
                  userData,
                  SECRET_TOKEN,
                  { expiresIn: "1d" },
                  (err, token) => {
                    if (err) {
                      res.statusMessage =
                        "Something went wrong generating token";
                      return res.status(400).end();
                    }

                    let formatUser = {
                      _id: user._id,
                      user_type: user.user_type,
                      full_name: user.full_name,
                      user_name: user.user_name,
                      user_type: user.user_type,
                      color: user.color,
                    };

                    return res
                      .status(200)
                      .json({ sessiontoken: token, user: formatUser });
                  }
                );
              } else {
                throw new Error("Invalid credentials");
              }
            })
            .catch((err) => {
              res.statusMessage = err.message;
              return res.status(400).end();
            });
        } else {
          throw new Error("User doesn't exists");
        }
      })
      .catch((err) => {
        res.statusMessage = err.message;
        return res.status(400).end();
      });
  });

  return router;
};
