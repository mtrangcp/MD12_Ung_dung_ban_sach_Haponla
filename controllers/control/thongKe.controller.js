var myModel = require("../../models/bill.model");
var BookModel = require("../../models/book");

exports.getThongKe = async (req, res, next) => {
    var list = await myModel.BillModel.find()
        .populate("id_address")
        .populate("id_discount")
        .populate("id_user");
    var soluong = list.length;

    res.render("bills/thongKe", { listBill: list, soluong: soluong });
};













