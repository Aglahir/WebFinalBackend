const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  income: {
    type: Number,
    required: true,
  },
  expense: {
    type: Number,
    required: true,
  },
});

const modelName = "data";

const dataModel = mongoose.model(modelName, dataSchema);

const dataProjection = ["user_id", "date", "income", "expense"];

function formatData(data) {
  return {
    user_id: data.user_id,
    date: data.data,
    income: data.income,
    expense: data.expense,
  };
}

const Data = {
  modelName: modelName,
  getDataByUserId: function (user_id) {
    return dataModel
      .find({ user_id: user_id })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getDataByTag: function (tag_id) {
    return dataModel
      .find({}, dataProjection)
      .populate("users", {
        tags: [tag_id],
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  createData: function (newData) {
    return dataModel
      .create(newData)
      .then((data) => {
        return formatData(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  getAllData: function () {
    return dataModel
      .find({}, dataProjection)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
  deleteByUserId: function (user_id) {
    return dataModel
      .deleteMany({ user_id })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

module.exports = Data;
