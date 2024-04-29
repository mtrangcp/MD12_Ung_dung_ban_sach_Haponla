var myModel = require("../../models/bill.model");
var BookModel = require("../../models/book");

exports.getThongKe = async (req, res, next) => {
    var list = await myModel.BillModel.find();
    var soluong = list.length;

    var listView = JSON.stringify(list);

    res.render("bills/thongKe", { listBill: list, soluong: soluong, listView: listView });
};













