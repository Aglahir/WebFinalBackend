module.exports = function (db) {
  const router = require("express").Router({ mergeParams: true });
  const handlePromise = require("../../helpers/handlePromise");
  const jsonParser = require("body-parser").json();

  router.get("/", (req, res) => {
    let tag_id = req.query.tag_id;

    if (!tag_id) {
      handlePromise(req, res, db.tags.getAllTags());
    } else {
      handlePromise(req, res, db.tags.getTagById(tag_id));
    }
  });

  router.post("/", jsonParser, (req, res) => {
    let { tag_name } = req.body;

    if (!tag_name) {
      res.statusMessage = "Missing 'tag_name'";
      return res.status(400).end();
    }

    handlePromise(req, res, db.tags.createTag({ tag_name }));
  });

  router.patch("/", jsonParser, (req, res) => {
    let { tag_id, tag_name } = req.body;

    if (!tag_id) {
      res.statusMessage = "Missing 'tag_id'";
      return res.status(400).end();
    }

    if (!tag_name) {
      res.statusMessage = "Missing 'tag_name'";
      return res.status(400).end();
    }

    handlePromise(req, res, db.tags.updateTag(tag_id, tag_name));
  });

  router.delete("/", jsonParser, (req, res) => {
    let { tag_id } = req.body;

    handlePromise(req, res, db.tags.deleteTag(tag_id));
  });

  return router;
};
