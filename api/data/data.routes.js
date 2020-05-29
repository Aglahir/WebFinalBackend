module.exports = function (db) {
  const router = require("express").Router({ mergeParams: true });
  const handlePromise = require("../../helpers/handlePromise");
  const jsonParser = require("body-parser").json();

  router.get("/", (req, res) => {
    let user_id = req.query.user_id;
    let tag_id = req.query.tag_id;

    if (user_id && tag_id) {
      res.statusMessage = "Only can filter by one 'user_id' or 'tag_id'";
      return res.status(400).end();
    }
    if (!user_id && !tag_id) {
      if (req.user.user_type === 4)
        handlePromise(req, res, db.data.getAllData());
      else handlePromise(req, res, db.data.getDataByUserId(req.user.user_id));
    } else {
      if (user_id) {
        handlePromise(req, res, db.data.getDataByUserId(user_id));
      } else {
        handlePromise(req, res, db.data.getDataByTag(tag_id));
      }
    }
  });

  router.post("/", jsonParser, (req, res) => {
    let { _id, date, income, expense } = req.body;
    let user_id = _id;
    if (!user_id) {
      user_id = req.user._id;
    }

    if (!date) {
      res.statusMessage = "Missing 'date'";
      return res.status(400).end();
    }

    if (!income) {
      res.statusMessage = "Missing 'income'";
      return res.status(400).end();
    }

    if (!expense) {
      res.statusMessage = "Missing 'expense'";
      return res.status(400).end();
    }

    let newData = {
      user_id,
      date: Date.parse(date),
      income,
      expense,
    };

    console.log(newData);

    handlePromise(req, res, db.data.createData(newData));
  });

  router.delete("/", jsonParser, (req, res) => {
    let { _id } = req.body;
    let user_id = _id;
    if (!user_id) {
      user_id = req.user.user_id;
    }
    handlePromise(req, res, db.data.deleteByUserId(user_id));
  });

  return router;
};
