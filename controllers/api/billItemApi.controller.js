const { BillItemModel } = require("../../models/bill.model");

exports.getListBillItem = async (req, res) => {
  const allData = await BillItemModel.find();
  return res.apiSuccess({ data: allData });
};

exports.addBillItem = async (req, res) => {
  console.log(req.body);
  const data = new BillItemModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.getOneBillItem = async (req, res) => {
  const { id } = req.params;

  const data = await BillItemModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

exports.deleteBillItem = async (req, res) => {
  const { id } = req.params;

  const data = await BillItemModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.updateBillItem = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await BillItemModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};
