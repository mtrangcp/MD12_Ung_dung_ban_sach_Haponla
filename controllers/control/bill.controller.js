var myModel = require('../../models/bill.model');

exports.getListBill = async (req, res, next) => {

    var list = await myModel.BillModel.find().populate('id_address').populate('id_discount').populate('id_user');
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

exports.getThapCao = async (req, res, next) => {
    var list = await myModel.BillModel.find().sort({ real_price: -1 }).populate('id_address').populate('id_discount').populate('id_user');
    var soluong = list.length;

    res.render('bills/listBill', { listBill: list, soluong: soluong });
}
exports.getCaoThap = async (req, res, next) => {
    var list = await myModel.BillModel.find().sort({ real_price: 1 }).populate('id_address').populate('id_discount').populate('id_user');
    var soluong = list.length;

    res.render('bills/listBill', { listBill: list, soluong: soluong });
}

exports.changeStatus = async (req, res, next) => {
    let msg = "";
    let _id = req.params.id;
    let objBill = await myModel.BillModel.findById(_id).populate('id_user').populate('id_address').populate('id_discount').populate('detail');

    try {
        if (req.method == 'POST') {
            let objBill = new myModel.BillModel();

            if (typeof (req.body.TrangThai != 'undefined')) {
                console.log(req.body.TrangThai);

                objBill.status = req.body.TrangThai;
            }

            objBill._id = _id;

            try {
                await myModel.BillModel.findByIdAndUpdate({ _id: _id }, objBill);
                msg = 'Cập nhật trạng thái thành công!'
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






