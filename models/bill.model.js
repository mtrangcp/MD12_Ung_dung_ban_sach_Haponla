/**
 * dev: ManhThai
 */
const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;
const { BookModel } = require("./book.model");
const { userModel, addressModel, discountModel } = require("./bookStore.model");

const BillItemSchema = new Schema(
  {
    quantity: { type: Number, min: 1, required: true },
    id_book: { type: ObjectId, ref: BookModel.modelName, required: true },
  },
  { versionKey: false, }
);

const BillItemModel = model("bill_item", BillItemSchema);

const BillSchema = new Schema(
  {
    status: {
      type: String,
      min: 0,
      max: 3,
    },
    temp_price: { type: Number, min: 0 },
    real_price: { type: Number, min: 0 },
    create_at: { type: Date, default: Date.now },
    detail: [{
      type: ObjectId, ref: BillItemModel.modelName, required: true
    }],
    id_discount: { type: ObjectId, ref: discountModel.modelName },
    id_user: { type: ObjectId, ref: userModel.modelName, required: true },
    id_address: { type: ObjectId, ref: addressModel.modelName, required: true },

  },
  {
    versionKey: false,
  }
);

const BillModel = model("bill", BillSchema);

module.exports = { BillItemModel, BillModel };
