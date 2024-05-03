/**
 * dev: ManhThai
 */
const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;
const { CategoryModel } = require("./category");
const { userModel } = require("./bookStore.model");

// book
const BookSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String },
    introduction: { type: String },
    page_number: { type: Number, min: 1 },
    publisher: { type: String },
    release_date: { type: Date },
    image: { type: String, default: "" },
    original_price: { type: Number, min: 0, required: true },
    price: { type: Number, min: 0 },
    sold: { type: Number, min: 0 },
    view: { type: Number, min: 0 },
    percent_discount: { type: Number, min: 0, max: 100 },
    variations: [
      {
        republish: { type: String, require: true },
        language: { type: String, default: "vi" },
        stock: { type: Number, min: 0 },
      },
    ],
    evaluates: [
      {
        star: { type: Number, required: true, min: 0, max: 5 },
        comment: { type: String },
        reply: { type: String },
        create_at: { type: Date, default: Date.now },
        id_user: { type: ObjectId, ref: userModel.modelName, required: true },
      },
    ],
    id_category: {
      type: ObjectId,
      ref: CategoryModel.modelName,
      required: true,
    },
  },
  {
    collection: "Book",
    versionKey: false,
  }
);


const BookModel = model("book", BookSchema);

module.exports = { BookModel };
