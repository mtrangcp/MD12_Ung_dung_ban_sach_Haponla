/**
 * dev: ManhThai
 */
const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;
const { BookModel } = require("./book.model");

const CartSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    min: 0,
  },
  id_book: {
    type: ObjectId,
    ref: BookModel.modelName,
    required: true
  },
});

const CartModel = model("cart", CartSchema);

module.exports = {
  CartModel,
};
