/**
 * dev: ManhThai
 */
const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;
const { CategoryModel } = require("./category.model");
const { userModel } = require("./bookStore.model");

// variation
const VariationSchema = new Schema({
  republish: { type: String, require: true },
  language: { type: String, default: "vi" },
});

const VariationModel = model("variation", VariationSchema);

// evaluate
const EvaluateSchema = new Schema({
  star: { type: Number, required: true, min: 0, max: 5 },
  comment: { type: String },
  reply: { type: String },
  create_at: { type: Date, default: Date.now },
  id_user: { type: ObjectId, ref: userModel.modelName, required: true },
});

const EvaluateModel = model("evaluate", EvaluateSchema);

// book
const BookSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String },
  detail: { type: String },
  image: { type: String, default: "" },
  price: { type: Number, min: 0, },
  stock: { type: Number, min: 0 },
  sold: { type: Number, min: 0 },
  view: { type: Number, min: 0 },
  percent_discount: { type: Number, min: 0, max: 100 },
  variations: [{
    type: ObjectId,
    ref: VariationModel.modelName,
  }],
  evaluates: [{
    type: ObjectId,
    ref: EvaluateModel.modelName,
  }],
  id_category: { type: ObjectId, ref: CategoryModel.modelName, required: true }

});

const BookModel = model("book", BookSchema);

module.exports = {
  VariationModel,
  EvaluateModel,
  BookModel,
};
