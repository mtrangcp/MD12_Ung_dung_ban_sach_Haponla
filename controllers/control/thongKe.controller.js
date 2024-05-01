var myModel = require("../../models/bill.model");
var bookStore = require("../../models/bookStore.model");

exports.getThongKe = async (req, res, next) => {
    var listBill = await myModel.BillModel.find();
    
    res.render("bills/thongKe", { listBill: listBill });
};


exports.getThongKeUser = async (req, res, next) => {
    let dk_loc = { role: "USER" };
    var listUser = await bookStore.userModel.find(dk_loc);

    res.render("users/tkUser", {  listUser: listUser });
};












