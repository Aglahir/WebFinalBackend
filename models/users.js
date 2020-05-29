const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tags",
    },
  ],
});

const modelName = "users";

const userModel = mongoose.model(modelName, usersSchema);

const validProjection = [
  "_id",
  "full_name",
  "user_name",
  "user_type",
  "color",
  "tags",
];

const tagsProjection = ["tag_name"];

function formatUser(user) {
  return {
    _id: user._id,
    full_name: user.full_name,
    user_name: user.user_name,
    user_type: user.user_type,
    color: user.color,
    tags: user.tags,
  };
}

const Users = {
  modelName: modelName,
  createUser: function (newUser) {
    return userModel
      .create(newUser)
      .then((user) => {
        return formatUser(user);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getUserById: function (user_id) {
    return userModel
      .findOne({ _id: user_id }, validProjection)
      .populate("tags", tagsProjection)
      .then((user) => {
        return formatUser(user);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  // This needs to return password --> Login
  getUserByUsername: function (user_name) {
    return userModel
      .findOne({ user_name })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getUsersByTagArray: function (tags) {
    return userModel
      .find({
        tags: {
          $in: tags,
        },
        validProjection,
      })
      .populate("tags", tagsProjection)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getAllUsers: function () {
    return userModel
      .find({}, validProjection)
      .populate("tags", tagsProjection)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  updateUser: function (user_id, newUser) {
    return userModel
      .findByIdAndUpdate(user_id, newUser, validProjection)
      .then((result) => {
        return formatUser(result);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  deleteUser: function (user_id) {
    return userModel
      .findByIdAndDelete({ _id: user_id }, validProjection)
      .then((result) => {
        return formatUser(result);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getUsersByTag: function (tag_id) {
    return userModel
      .find({ tags: tag_id }, validProjection)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

module.exports = Users;
