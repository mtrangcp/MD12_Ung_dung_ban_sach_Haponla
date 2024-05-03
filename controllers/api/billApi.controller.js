const { BillModel } = require("../../models/bill.model");
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
  console.log("req.body: "+req.body);
  const data = new BillModel(req.body);
   
  try {
    let canCreateBill = true;

    for (let item of data.detail) {
      // Lấy tt sách từ BillItem
      let bookId = item.id_book;
      let quantity = item.quantity;

      let book = await BookModel.findById(bookId);
      if (book && quantity > book.stock) {
          canCreateBill = false;
          break; 
      } 
    }

    if (canCreateBill) {
      // Cập nhật số lượng sách và lưu hóa đơn
      for (let item of data.detail) {
        let bookId = item.id_book;
        let quantity = item.quantity;

        let book = await BookModel.findById(bookId);
        if (book) {
          book.sold += quantity;
          book.stock -= quantity;
          await book.save();
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
