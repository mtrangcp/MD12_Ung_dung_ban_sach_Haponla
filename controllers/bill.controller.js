const {BillModel} = require('../models/bill.model')
const { respondError, respondSuccess } = require("../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const bills = await BillModel.find();

    respondSuccess(res, 200, bills);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const bill = new BillModel(req.body);
    await bill.save();

    respondSuccess(res, 201, bill);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bill = await BillModel.findById(id);

    respondSuccess(res, 200, bill);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bill = await BillModel.findByIdAndDelete(id);

    respondSuccess(res, 200, bill);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const bill = await BillModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, bill);
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
