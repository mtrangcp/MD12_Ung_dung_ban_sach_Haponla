const mongoose = require("mongoose");
const { MongoDbConnection } = require("../configs/database");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const CategoryModel = MongoDbConnection.model("category", CategorySchema);

module.exports = { CategoryModel };
