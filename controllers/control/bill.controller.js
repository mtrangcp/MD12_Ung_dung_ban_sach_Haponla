var myModel = require('../../models/bill.model');

exports.getListBill = async (req, res, next) => {

    var list = await myModel.BillModel.find();
    var soluong = list.length;

    res.render('bills/listBill', { listBill: list, soluong: soluong });
}

exports.getBillUsername = async (req, res, next) => {
    let idUser = req.params.idUser;
    let dk_loc = { id_user: idUser };
    if (typeof (req.query.idUser) != 'undefined') {
        dk_loc = { id_user: req.query.idUser };
    }
    console.log(dk_loc);

    var list = await myModel.BillModel.find(dk_loc);
    var soluong = list.length;

    res.render('bills/listBillUser', { listBillUser: list, soluong: soluong });
}








