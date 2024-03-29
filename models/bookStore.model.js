var db = require('../configs/database')

const addressChema = new db.mongoose.Schema(
    {
        username: { type: String, required: true },
        phone: { type: Number, required: true },
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
        start_date: { type: String, required: true },
        expiration_date: { type: String, required: true },
        detail: { type: String, required: true },
        status: { type: Boolean, required: true },
        entityType: {
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



module.exports = { addressModel, discountModel, item_discountModel, notificationModel, userModel, categoryModel };