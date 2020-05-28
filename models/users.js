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

const Users = {
  modelName: modelName,
  createUser: function (newUser) {
    return userModel
      .create(newUser)
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getUserById: function (user_id) {
    return userModel
      .findOne({ _id: user_id })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
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
  getAllUsers: function () {
    return userModel
      .find()
      .populate("tags")
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  updateUser: function (user_id, newUser) {
    return userModel
      .findByIdAndUpdate(user_id, newUser)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  deleteUser: function (user_id) {
    return userModel
      .findByIdAndDelete({ _id: user_id })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getUsersByTag: function (tag_id) {
    return userModel
      .find({ tags: tag_id })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

module.exports = Users;
