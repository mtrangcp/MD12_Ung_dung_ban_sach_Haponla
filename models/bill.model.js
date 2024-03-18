const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;
const { BookModel } = require("./book.model");
const { userModel, addressModel, discountModel } = require("./bookStore.model");
var db = require('../configs/database');

const BillItemSchema = new db.mongoose.Schema(
  {
    quantity: { type: Number, min: 1, required: true },
    id_book: { type: db.mongoose.Types.ObjectId, ref: BookModel.modelName, required: true },
  },
  { versionKey: false, }
);

const BillItemModel = model("bill_item", BillItemSchema);

const BillSchema = new db.mongoose.Schema(
  {
    status: {
      type: Number,
      min: 0,
      max: 3,
    },
    temp_price: { type: Number, min: 0 },
    real_price: { type: Number, min: 0 },
    create_at: { type: Date, default: Date.now },
    detail: [{
      type: db.mongoose.Types.ObjectId, ref: BillItemModel.modelName, required: true
    }],
    id_discount: { type: db.mongoose.Types.ObjectId, ref: discountModel.modelName },
    id_user: { type: ObjectId, ref: userModel.modelName, required: true },
    id_address: { type: db.mongoose.Types.ObjectId, ref: addressModel.modelName, required: true },

  },
  {
    versionKey: false,
  }
);

const BillModel = model("bill", BillSchema);

module.exports = { BillItemModel, BillModel };
