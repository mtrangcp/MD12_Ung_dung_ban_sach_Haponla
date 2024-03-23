/**
 * dev: ManhThai
 */
const { BillModel } = require("../../models/bill.model");

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

const add = async (req, res) => {
  console.log(req.body);
  const data = new BillModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  const data = await BillModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const data = await BillModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const set = async (req, res) => {
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

module.exports = {
  getAll,
  get,
  add,
  remove,
  set,
};
