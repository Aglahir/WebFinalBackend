const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  data: {
    type: JSON,
    required: true,
  },
});

const modelName = "data";

const dataModel = mongoose.model(modelName, dataSchema);

const Data = {
  modelName: modelName,
  getDataByUserId: function (user_id) {
    return dataModel
      .find({ user_id: user_id })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

module.exports = Data;
