const mongoose = require("mongoose");
const { MongoDbConnection } = require("../configs/database");
const { BookModel } = require("./book.model");
const { userModel, addressModel, discountModel } = require("./bookStore.model");

const BillItemSchema = new mongoose.Schema(
  {
    quantity: { type: Number, min: 1, required: true },
    id_book: { type: mongoose.Types.ObjectId, ref: BookModel.modelName, required: true },
  },
  {
    versionKey: false,
  }
);

const BillItemModel = MongoDbConnection.model("bill_item", BillItemSchema);

const BillSchema = new mongoose.Schema(
  {
    customer_name: { type: String, required: true, },
    phone: { type: String, required: true, },
    create_at: { type: Date, default: Date.now },
    temp_price: { type: Number, min: 0 },
    real_price: { type: Number, min: 0 },
    status: { type: String, min: 0, max: 2, },
    detail: [BillItemSchema],
    id_user: { type: mongoose.Types.ObjectId, ref: userModel.modelName },
    id_address: { type: mongoose.Types.ObjectId, ref: addressModel.modelName },
    id_discount: { type: mongoose.Types.ObjectId, ref: discountModel.modelName },
  },
  {
    versionKey: false,
  }
);

const BillModel = MongoDbConnection.model("bill", BillSchema);

module.exports = { BillItemModel, BillModel };
