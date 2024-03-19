var myModel = require('../../models/bill.model');

exports.getListBill = async (req, res, next) => {

    var list = await myModel.BillModel.find();
    var soluong = list.length;

    res.render('bills/listBill', { listBill: list, soluong: soluong });
}

exports.getBillUsername = async (req, res, next) => {
    try {
        let idU = req.params.idU;
        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc).populate('id_user').populate('id_address').populate('id_discount').populate('detail');
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render('bills/listBillUser', { listBillUser: list, soluong: soluong });
}








