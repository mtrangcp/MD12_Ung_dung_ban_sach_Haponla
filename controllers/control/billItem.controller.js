const { BillItemModel } = require("../../models/bill.model");
const { respondError, respondSuccess } = require("../../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const billItems = await BillItemModel.find();

    respondSuccess(res, 200, billItems);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const billItem = new BillItemModel(req.body);
    await billItem.save();

    respondSuccess(res, 201, billItem);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const billItem = await BillItemModel.findById(id);

    respondSuccess(res, 200, billItem);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const billItem = await BillItemModel.findByIdAndDelete(id);

    respondSuccess(res, 200, billItem);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const billItem = await BillItemModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, billItem);
  } catch (error) {
    respondError(res, error);
  }
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  set,
};
