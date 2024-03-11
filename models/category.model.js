const { Schema, model } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/5078/5078755.png",
  },
});

const CategoryModel = model("category", CategorySchema);

module.exports = {
  CategoryModel,
};
