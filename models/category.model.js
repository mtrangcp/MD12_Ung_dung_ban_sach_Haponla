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
      default: `https://cdn-icons-png.flaticon.com/512/5078/5078755.png`
    },
  },
  {
    versionKey: false,
  }
);

const CategoryModel = MongoDbConnection.model("category", CategorySchema);

module.exports = { CategoryModel };
