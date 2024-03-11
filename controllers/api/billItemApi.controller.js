/**
 * dev: ManhThai
 */
const { BillItemModel } = require("../../models/bill.model");

const getAll = async (req, res) => {
  const allData = await BillItemModel.find();
  return res.apiSuccess({ data: allData });
};

const add = async (req, res) => {
  console.log(req.body);
  const data = new BillItemModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  const data = await BillItemModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const data = await BillItemModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const set = async (req, res) => {
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

module.exports = {
  getAll,
  get,
  add,
  remove,
  set,
};
