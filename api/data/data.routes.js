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
      else handlePromise(req, res, db.data.getDataByUserId(req.user._id));
    } else {
      console.log("checkpoint");

      if (user_id) {
        console.log("checkpointFail");
        handlePromise(req, res, db.data.getDataByUserId(user_id));
      } else {
        console.log("checkpoint2");
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

  router.get("/generateData", (req, res) => {
    if (req.user.user_type !== 4) {
      res.statusMessage = "Unauthorized access";
      res.status(401).end();
    } else {
      var data = [];
      var value1 = 500;
      var value2 = 600;

      for (var i = 0; i < 12; i++) {
        let date = new Date();
        date.setMonth(i, 1);
        value1 -= Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 50
        );
        value2 -= Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 50
        );
        data.push({
          user_id: req.user._id,
          date: date,
          income: value1,
          expense: value2,
        });
      }

      console.log(data);

      handlePromise(req, res, db.data.insertMany(data));
    }
  });

  router.delete("/", jsonParser, (req, res) => {
    let { _id } = req.body;
    let user_id = _id;
    if (!user_id) {
      user_id = req.user._id;
    }
    handlePromise(req, res, db.data.deleteByUserId(user_id));
  });

  router.delete("/all", jsonParser, (req, res) => {
    if (req.user.user_type == 4) {
      handlePromise(req, res, db.data.deleteAll());
    } else {
      res.statusMessage = "Unauthorized access";
      res.status(401).end();
    }
  });

  return router;
};
