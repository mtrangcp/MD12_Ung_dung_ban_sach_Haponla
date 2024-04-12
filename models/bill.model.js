const { Schema, model } = require("mongoose");
const ObjectId = Schema.ObjectId;
const { BookModel } = require("./book");
const { userModel, addressModel, discountModel } = require("./bookStore.model");

const BillItemSchema = new Schema(
  {
    quantity: { type: Number, min: 1, required: true },
    id_book: { type: ObjectId, ref: BookModel.modelName, required: true },
  },
  { collection: "BillItem", versionKey: false }
);

const BillItemModel = model("bill_item", BillItemSchema);

const BillSchema = new Schema(
  {
    status: {
      /*
        0: đã bị hủy
        1: đã đặt hàng, chờ xác nhận (có thể hủy)
        2: đã xác nhận, đang xử lí (có thể hủy)
        3: đang vận chuyển
        4: giao hàng thành công
      */
      type: Number,
      min: 0,
      max: 4,
      default: 1,
    },
    temp_price: { type: Number, min: 0 },
    real_price: { type: Number, min: 0 },
    method: { type: String },
    create_at: { type: Date, default: Date.now },
    detail: [
      {
        type: ObjectId,
        ref: BillItemModel.modelName,
        required: true,
      },
    ],
    id_discount: { type: ObjectId, ref: discountModel.modelName },
    id_user: { type: ObjectId, ref: userModel.modelName, required: true },
    id_address: { type: ObjectId, ref: addressModel.modelName, required: true },
  },
  { collection: "Bill", versionKey: false }
);

const BillModel = model("bill", BillSchema);

module.exports = { BillItemModel, BillModel };
