var db = require('../configs/database');
const { BookModel } = require("./book.model");

const addressChema = new db.mongoose.Schema(
    {
        username: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true }
    },
    { collection: 'Address', versionKey: false }
);

const item_discountChema = new db.mongoose.Schema(
    {
        id_discount: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'discountModel' }],
        status: { type: Boolean }
    },
    { collection: 'ItemDiscount', versionKey: false }
);

const discountChema = new db.mongoose.Schema(
    {
        codename: { type: String, required: true },
        value: { type: Number, required: true },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        detail: { type: String, required: true },
        status: { type: Boolean, required: true },
        type: {
            type: String,
            enum: ['SHIP', 'PERCENT', 'PRICE'], // Các loại cố định
            required: true
        },
        condition: { type: Number, required: true }
    },
    { collection: 'Discount', versionKey: false }
);

const notificationChema = new db.mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true }
    },
    { collection: 'Notification', versionKey: false }
);

const cartSchema = new db.mongoose.Schema(
  {
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, min: 0 },
    id_book: { type: db.mongoose.Schema.Types.ObjectId, ref: 'BookModel', required: true }
  },
  { collection: 'Cart', versionKey: false });   



const userChema = new db.mongoose.Schema(
    {
        username: { type: String, required: true },
        passwork: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        fullname: { type: String, required: true },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE', 'OTHER'],
            required: true
        },
        active: { type: Boolean, required: true },
        role: { type: String, enum: ['USER', 'ADMIN'], required: true },
        image: { type: String, required: false },
        address: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'addressModel', required: false }],
        discounts: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'item_discountModel', required: false }],
        notifications: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'notificationModel', required: false }],
        carts: [{ type: db.mongoose.Schema.Types.ObjectId, ref: 'cartModel', required: false }],
        points: { type: Number, required: true }
    },
    { collection: 'User', versionKey: false }
);

const categoryChema = new db.mongoose.Schema(
    {
        name: { type: String, required: true }
    },
    { collection: 'Category', versionKey: false }
);


let addressModel = db.mongoose.model('addressModel', addressChema);
let discountModel = db.mongoose.model('discountModel', discountChema);
let item_discountModel = db.mongoose.model('item_discountModel', item_discountChema);
let notificationModel = db.mongoose.model('item_notificationModel', notificationChema);
let userModel = db.mongoose.model('userModel', userChema);
let categoryModel = db.mongoose.model('categoryModel', categoryChema);
let cartModel = db.mongoose.model('cartModel', cartSchema);


module.exports = { addressModel, discountModel, item_discountModel, notificationModel, userModel, categoryModel, cartModel };