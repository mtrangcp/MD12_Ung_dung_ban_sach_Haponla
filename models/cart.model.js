const mongoose = require("mongoose");
const { MongoDbConnection } = require("../configs/database");
const { BookModel } = require("./book.model");

const CartSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      min: 0,
    },
    quantity: {
      type: Number,
      min: 1,
    },
    id_book: {
      type: mongoose.Types.ObjectId,
      ref: BookModel.modelName,
    },
  },
  { versionKey: false }
);

const CartModel = MongoDbConnection.model("cart", CartSchema);

module.exports = {
  CartModel,
};
