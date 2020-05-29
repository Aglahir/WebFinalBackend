const mongoose = require("mongoose");
const tagsSchema = mongoose.Schema({
  tag_name: {
    type: String,
    required: true,
    unique: true,
  },
});

const tagsProjection = ["tag_name"];

function formatTag(tag) {
  return {
    _id: tag._id,
    tag_name: tag.tag_name,
  };
}

const modelName = "tags";

const tagsModel = mongoose.model(modelName, tagsSchema);

const Tags = {
  modelName: modelName,
  createTag: function (newTag) {
    return tagsModel
      .create(newTag)
      .then((tag) => {
        return formatTag(tag);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getTagById: function (tag_id) {
    return tagsModel
      .findOne({ _id: tag_id }, tagsProjection)
      .then((tag) => {
        return tag;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getAllTags: function () {
    return tagsModel
      .find({}, tagsProjection)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  updateTag: function (tag_id, tag_name) {
    return tagsModel
      .findByIdAndUpdate(tag_id, { tag_name }, tagsProjection)
      .then((result) => {
        return formatTag(result);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  deleteTag: function (tag_id) {
    return tagsModel
      .findByIdAndDelete(tag_id, tagsProjection)
      .then((result) => {
        return formatTag(result);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

module.exports = Tags;
