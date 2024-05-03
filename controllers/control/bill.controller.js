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

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};

exports.chitietBill = async (req, res) => {
    const idBill = req.params.idBill;
    const objBill = await myModel.BillModel.findById(idBill).populate("id_discount").populate("id_user").populate("id_address");

    var listSach = [];
    var listIDSach = [];
    var listIDBillitem = [];
    var listBillitem = [];
    if (objBill) {
        listIDBillitem = objBill.detail;
        if (listIDBillitem) {
            console.log("--------------------->>listIDBillitem ok");
            console.log(listIDBillitem);

            for (const idItem of listIDBillitem) {
                var newBIllitem = await myModel.BillItemModel.findOne(idItem);
                listBillitem.push(newBIllitem);
            }
            console.log("--------------------->>listBillitem ok");
            console.log(listBillitem);

            for (const detail of listBillitem) {
                listIDSach.push(detail.id_book); // Lấy ObjectId của sách từ trường type trong mỗi detail
            }

            for (const idsach of listIDSach) {
                var newSach = await BookModel.BookModel.findOne(idsach);
                listSach.push(newSach);
            }

            console.log("--------------------->>listSach: ");
            console.log(listSach);
        } else {
            console.log("--------------------->>");
            console.log(listIDBillitem);
            console.log("loi listIDBillitem");
        }

    } else {
        console.log("k tim thay bill");
    }
    res.render("bills/chitietBill", { objBill: objBill, listSach: listSach, listBillitem: listBillitem });
};

exports.getBillUserTienThapCao = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .sort({ real_price: 1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};
exports.getBillUserTienCaoThap = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .sort({ real_price: -1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};

exports.getTongThapCao = async (req, res, next) => {
    console.log("getTongThapCao");
    try {
        var list = await myModel.BillModel.find()
            .sort({ real_price: 1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};
exports.getTongCaoThap = async (req, res, next) => {
    console.log("getTongCaoThap");
    try {
        var list = await myModel.BillModel.find()
            .sort({ real_price: -1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};

exports.getBillUserTgMoi = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .sort({ create_at: -1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};
exports.getBillUserTgCu = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .sort({ create_at: 1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};

exports.getBillTgMoi = async (req, res, next) => {
    try {
        var list = await myModel.BillModel.find()
            .sort({ create_at: -1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};
exports.getBillTgCu = async (req, res, next) => {
    try {
        var list = await myModel.BillModel.find()
            .sort({ create_at: 1 })
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};

exports.getBillUser0 = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU, status: 0 };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};
exports.getBillUser1 = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU, status: 1 };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};
exports.getBillUser2 = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU, status: 2 };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};
exports.getBillUser3 = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU, status: 3 };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};
exports.getBillUser4 = async (req, res, next) => {
    let idU = req.params.idUser;
    console.log("idUser: " + idU);
    try {
        let dk_loc = { id_user: idU, status: 4 };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBillUser", { listBillUser: list, soluong: soluong, idU: idU });
};

exports.getBillWithStatus = async (req, res, next) => {
    let status = req.params.status;
    console.log("status: " + status);
    try {
        let dk_loc = { status: status };
        console.log("----dk loc:" + dk_loc);

        var list = await myModel.BillModel.find(dk_loc)
            .populate("id_address")
            .populate("id_discount")
            .populate("id_user");
        var soluong = list.length;
    } catch (error) {
        console.log(error);
    }

    res.render("bills/listBill", { listBill: list, soluong: soluong });
};

exports.changeStatus = async (req, res, next) => {
    let msg = "";
    let _id = req.params.id;
    let objBill = await myModel.BillModel.findById(_id).populate("id_user").populate("id_address").populate("id_discount").populate("detail");

    console.log(objBill.detail);
    try {
        if (req.method == "POST") {
            if (typeof req.body.TrangThai !== "undefined") {
                console.log("req.body.TrangThai: " + req.body.TrangThai);

                // Khởi tạo đối tượng BillModel mới để cập nhật
                let objBillToUpdate = {
                    status: req.body.TrangThai,
                    detail: objBill.detail 
                };

                try {
                    await myModel.BillModel.findByIdAndUpdate(_id, objBillToUpdate);
                    msg = "Cập nhật trạng thái đơn hàng thành công!";
                    res.redirect('/bills');
                } catch (err) {
                    msg = "Lỗi: " + err;
                    console.log(err);
                }
            } 
        }
    } catch (error) {
        console.log(error);
    }

    res.render("bills/changeStatus", { objBill: objBill, msg: msg, cre: objBill.create_at });
};
