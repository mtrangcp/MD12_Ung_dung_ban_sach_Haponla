var myModel = require('../../models/bill.model');

exports.getListBill = async (req, res, next) => {

    var list = await myModel.BillModel.find();
    var soluong = list.length;

    res.render('bills/listBill', { listBill: list, soluong: soluong });
}








