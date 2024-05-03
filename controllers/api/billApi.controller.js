const { BillModel, BillItemModel } = require("../../models/bill.model");
var { BookModel } = require("../../models/book");

const getAll = async (req, res) => {
  const { id_user } = req.query;
  console.log(id_user);

  var allData;
  if (id_user) {
    try {
      allData = await BillModel.find({ id_user: id_user });
    } catch (error) {
      return res.apiError("something's wrong, try another");
    }
  } else {
    allData = await BillModel.find();
  }

  return res.apiSuccess({ data: allData });
};

var objReturn = {
  status: 1,
  msg: 'ok'
}

exports.getListBill = async (req, res, next) => {
  let listBill = [];

  try {
    listBill = await BillModel.find();
    if (listBill) {
      objReturn.data = listBill;
      objReturn.status = 1;
      objReturn.msg = 'lay thanh cong'

    } else {
      objReturn.status = 0;
      objReturn.msg = 'k co du lieu'
    }

  } catch (error) {
    objReturn.status = 0;
    objReturn.msg = error.msg;
    console.log(msg);
  }

  return res.json(objReturn);
}

exports.addBill = async (req, res) => {
  console.log("req.body: ",req.body);
  const data = new BillModel(req.body);

  console.log("data: " + data);
  console.log("data.detail: " + data.detail);
   
  try {
    let canCreateBill = true;

    // Lấy danh sách đầy đủ của các BillItem từ MongoDB
    let fullDetail = [];
    for (let itemId of data.detail) {
      let billItem = await BillItemModel.findById(itemId).exec();
      if (billItem) {
        fullDetail.push(billItem);
      }
    }

    // Kiểm tra số lượng sách trước khi tạo hóa đơn
    for (let item of fullDetail) {
      let bookId = item.id_book;
      let quantity = item.quantity;

      let bookItem = await BookModel.findById(bookId).exec();
      if (!bookItem || quantity > bookItem.stock) {
        canCreateBill = false;
        break;
      }
    }

    if (canCreateBill) {
      // Cập nhật số lượng sách và lưu hóa đơn
      for (let item of fullDetail) {
        let bookId = item.id_book;
        let quantity = item.quantity;

        let bookItem = await BookModel.findById(bookId).exec();
        if (bookItem) {
          bookItem.sold += quantity;
          bookItem.stock -= quantity;
          await bookItem.save();
        }
      }

      // Lưu hóa đơn sau khi đã cập nhật số lượng sách thành công
      await data.save();
      return res.apiSuccess({ data });
    } else {
      // Nếu có sách không đủ số lượng, trả về lỗi
      return res.status(400).json({ message: "Hàng trong kho không đủ. Vui lòng giảm số lượng!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi thêm hóa đơn." });
  }
  
};


exports.getOneBill = async (req, res) => {
  const { id } = req.params;

  const data = await BillModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

exports.deleteBill = async (req, res) => {
  const { id } = req.params;

  const data = await BillModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.updateBill = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await BillModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};
