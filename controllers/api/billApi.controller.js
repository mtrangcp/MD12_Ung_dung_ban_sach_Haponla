const { BillModel } = require("../../models/bill.model");

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
  console.log(req.body);
  const data = new BillModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
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
