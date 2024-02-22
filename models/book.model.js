const mongoose = require("mongoose");
const { MongoDbConnection } = require("../configs/database");
const { CategoryModel } = require("./category.model");
const { userModel } = require("./bookStore.model");

const BookVariationSchema = new mongoose.Schema(
  {
    quality: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
const BookVariationModel = MongoDbConnection.model(
  "book_variation",
  BookVariationSchema
);

const EvaluateSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
    reply: {
      type: String,
    },
    id_user: {
      type: mongoose.Types.ObjectId,
      ref: userModel.modelName,
    },
  },
  { versionKey: false }
);
const EvaluateModel = MongoDbConnection.model("evaluate", EvaluateSchema);

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    detail: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      min: 0,
    },
    stock: {
      type: Number,
      min: 0,
    },
    sold: {
      type: Number,
      min: 0,
    },
    view: {
      type: Number,
      min: 0,
    },
    percent_discount: {
      type: Number,
      min: 0,
      max: 100,
    },
    book_variation: [
      {
        type: mongoose.Types.ObjectId,
        ref: BookVariationModel.modelName,
      },
    ],
    evaluate: [
      {
        type: mongoose.Types.ObjectId,
        ref: EvaluateModel.modelName,
      },
    ],
    id_category: {
      type: mongoose.Types.ObjectId,
      ref: CategoryModel.modelName,
    },
  },
  {
    versionKey: false,
  }
);

const BookModel = MongoDbConnection.model("book", BookSchema);

module.exports = {
  BookModel,
};
