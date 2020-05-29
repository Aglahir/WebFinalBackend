module.exports = function (db) {
  const router = require("express").Router({ mergeParams: true });
  const handlePromise = require("../../helpers/handlePromise");
  const jsonParser = require("body-parser").json();

  router.get("/", (req, res) => {
    let tag_id = req.query.tag_id;

    if (tag_id) {
      if (req.user.user_type === 4) {
        handlePromise(req, res, db.tags.getTagById(tag_id));
      } else {
        req.user.tags.forEach((element) => {
          if (element.tag_id === tag_id) return res.status(200).json(element);
        });

        res.statusMessage = "Restricted information";
        return res.status(401).end();
      }
    } else {
      if (req.user.user_type === 4) {
        handlePromise(req, res, db.tags.getAllTags());
      } else {
        return res.status(200).json(req.user.tags);
      }
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
    let { _id, tag_name } = req.body;
    let tag_id = _id;

    if (!tag_id) {
      res.statusMessage = "Missing 'tag_id'";
      return res.status(400).end();
    }

    if (!tag_name) {
      res.statusMessage = "Missing 'tag_name'";
      return res.status(400).end();
    }

    if (req.user.user_type === 4) {
      handlePromise(req, res, db.tags.updateTag(tag_id, tag_name));
    } else {
      let flag = false;
      for (let tag in req.user.tags) {
        if (req.user.tags[tag].tag_id === tag_id) {
          flag = true;
          break;
        }
      }

      if (flag) {
        handlePromise(req, res, db.tags.updateTag(tag_id, tag_name));
      } else {
        res.statusMessage = "Restricted information";
        return res.status(401).end();
      }
    }
  });

  router.delete("/", jsonParser, (req, res) => {
    let { _id } = req.body;
    let tag_id = _id;
    if (!tag_id) {
      res.statusMessage = "Missing tag_id";
      return res.status(400).end();
    }

    if (req.user.user_type === 4) {
      handlePromise(req, res, db.tags.deleteTag(tag_id));
    } else {
      let flag = false;
      for (let tag in req.user.tags) {
        if (req.user.tags[tag].tag_id === tag_id) {
          flag = true;
          break;
        }
      }

      if (flag) {
        handlePromise(req, res, db.tags.deleteTag(tag_id));
      } else {
        res.statusMessage = "Restricted information";
        return res.status(401).end();
      }
    }
  });

  return router;
};
