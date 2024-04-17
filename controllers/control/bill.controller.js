var myModel = require("../../models/bill.model");
var BookModel = require("../../models/book");

exports.getListBill = async (req, res, next) => {
    var list = await myModel.BillModel.find()
        .populate("id_address")
        .populate("id_discount")
        .populate("id_user");
    var soluong = list.length;

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};

exports.getBillUsername = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong });
};

exports.chitietBill = async (req, res) => {
    const idBill = req.params.idBill;
    const objBill = await myModel.BillModel.findById(idBill).populate("id_discount");

    var listSach = [];
    if (objBill) {
        const listDetail = objBill.detail;
        const listIDSach = objBill.detail.id_book;
        for (const idsach of listIDSach) {
            var newSach = await BookModel.BookModel.findOne(idsach);
            listSach.push(newSach);
        }
    } else {
        console.log("k tim thay bill");
    }


    res.render("bills/chitietBill", { objBill: objBill, soluong: soluong, listSach: listSach, listDetail: listDetail });
};

exports.getThapCao = async (req, res, next) => {
    var list = await myModel.BillModel.find()
        .sort({ real_price: -1 })
        .populate("id_address")
        .populate("id_discount")
        .populate("id_user");
    var soluong = list.length;

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};
exports.getCaoThap = async (req, res, next) => {
    var list = await myModel.BillModel.find()
        .sort({ real_price: 1 })
        .populate("id_address")
        .populate("id_discount")
        .populate("id_user");
    var soluong = list.length;

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};

exports.changeStatus = async (req, res, next) => {
    let msg = "";
    let _id = req.params.id;
    let objBill = await myModel.BillModel.findById(_id)
        .populate("id_user")
        .populate("id_address")
        .populate("id_discount")
        .populate("detail");

    console.log(objBill.detail);
    try {
        if (req.method == "POST") {
            let objBill1 = new myModel.BillModel();

            if (typeof (req.body.TrangThai != "undefined")) {
                console.log(req.body.TrangThai);

                objBill1.status = req.body.TrangThai;
            }

            objBill1._id = _id;
            objBill1.detail = objBill.detail;

            try {
                await myModel.BillModel.findByIdAndUpdate({ _id: _id }, objBill1);
                msg = "Cập nhật trạng thái thành công!";

                console.log(objBill);
            } catch (err) {
                msg = "Lỗi: " + err;
                console.log(err);
            }
        }
    } catch (error) {
        console.log(error);
    }

    res.render("bills/changeStatus", {
        objBill: objBill,
        msg: msg,
        cre: objBill.create_at,
    });
};
