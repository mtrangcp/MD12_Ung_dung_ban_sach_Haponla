var myModel = require('../../models/bill.model');

exports.getListBill = async (req, res, next) => {

    var list = await myModel.BillModel.find();
    var soluong = list.length;

    res.render('bills/listBill', { listBill: list, soluong: soluong });
}

exports.getBillUsername = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {

        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc).populate('id_address').populate('id_discount');
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render('bills/listBillUser', { listBillUser: list, soluong: soluong });
}

exports.getPriceThapCao = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {

        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc).sort({ real_price: -1 }).populate('id_address').populate('id_discount');
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render('bills/listBillUser', { listBillUser: list, soluong: soluong });
}
exports.getPriceCaoThap = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {

        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc).sort({ real_price: 1 }).populate('id_address').populate('id_discount');
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render('bills/listBillUser', { listBillUser: list, soluong: soluong });
}

exports.changeStatus = async (req, res, next) => {
    let msg = "";
    try {
        let _id = req.params.id;
        console.log("idUser: " + _id);
        let dk_loc = { _id: _id };
        console.log("----dk loc:" + dk_loc);

        var objBill = await myModel.BillModel.find(dk_loc).populate('id_user').populate('id_address').populate('id_discount').populate('detail');
        console.log(objBill);
        if (req.method == 'POST') {
            let objBill = new myModel.spModel();

            if (typeof (req.body.TrangThai != 'undefined')) {
                objBill.status = req.body.TrangThai;
            }

            objBill._id = _id;

            try {
                await myModel.spModel.findByIdAndUpdate({ _id: _id }, objBill);
                msg = 'Sửa thành công!'
                console.log(objBill);

            } catch (err) {
                msg = 'Lỗi: ' + err;
                console.log(err);
            }

        }
    } catch (error) {
        console.log(error);
    }

    res.render('bills/changeStatus', { objBill: objBill, msg: msg, cre: objBill.create_at });
}






