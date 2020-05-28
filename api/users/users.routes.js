module.exports = function (db) {
  const router = require("express").Router({ mergeParams: true });
  const handlePromise = require("../../helpers/handlePromise");
  const repository = require("./users.repository")(db);
  const bcryptjs = require("bcryptjs");
  const jsonParser = require("body-parser").json();

  router.get("/", (req, res) => {
    let user_id = req.query.user_id;
    let tag_id = req.query.tag_id;

    if (user_id && tag_id) {
      res.statusMessage = "Only can filter by one 'user_id' or 'tag_id'";
      return res.status(400).end();
    }
    if (!user_id && !tag_id) {
      handlePromise(req, res, repository.getAllUsers());
    } else {
      if (user_id) {
        handlePromise(req, res, repository.getUserById(user_id));
      } else {
        handlePromise(req, res, repository.getUsersByTag(tag_id));
      }
    }
  });

  router.post("/", jsonParser, (req, res) => {
    let { full_name, user_name, password, user_type, color } = req.body;
    if (!full_name || !user_name || !password || !user_type || !color) {
      res.statusMessage = "Parameter missing in the body of the request.";
      return res.status(406).end();
    }

    let newUser = {
      full_name,
      user_name,
      password,
      user_type,
      color,
    };

    bcryptjs
      .hash(newUser.password, 10)
      .then((hashedPassword) => {
        newUser.password = hashedPassword;

        handlePromise(req, res, db.users.createUser(newUser));
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  });

  router.patch("/", jsonParser, (req, res) => {
    let { user_id, full_name, password, user_type, color, tags } = req.body;

    if (!user_id) {
      res.statusMessage = "Missing 'user_id'";
      return res.status(400).end();
    }

    let newUser = {
      _id: user_id,
    };

    if (full_name) {
      newUser.full_name = full_name;
    }

    if (password) {
      newUser.password = password;
    }

    if (user_type) {
      newUser.user_type = user_type;
    }

    if (color) {
      newUser.color = color;
    }

    if (tags) {
      newUser.tags = tags;
    }

    if (password) {
      bcryptjs
        .hash(newUser.password, 10)
        .then((hashedPassword) => {
          newUser.password = hashedPassword;
          handlePromise(req, res, repository.updateUser(user_id, newUser));
        })
        .catch((err) => {
          throw new Error(err.message);
        });
    } else {
      handlePromise(req, res, repository.updateUser(user_id, newUser));
    }
  });

  router.delete("/", jsonParser, (req, res) => {
    let { user_id } = req.body;

    if (!user_id) {
      res.statusMessage = "Missing 'user_id' parameter in body";
      return res.status(400).end();
    } else {
      handlePromise(req, res, repository.deleteUser(user_id));
    }
  });

  return router;
};
