module.exports = function (db) {
  const router = require("express").Router({ mergeParams: true });
  const handlePromise = require("../../helpers/handlePromise");

  router.get("/", (req, res) => {
    handlePromise(req, res, db.data.getDataByUserId(req.user.user_id));
  });

  return router;
};
