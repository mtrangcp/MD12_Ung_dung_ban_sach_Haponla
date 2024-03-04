const {VariationModel} = require('../models/book.model')
const { respondError, respondSuccess } = require("../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const variations = await VariationModel.find();

    respondSuccess(res, 200, variations);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const variation = new VariationModel(req.body);
    await variation.save();

    respondSuccess(res, 201, variation);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const variation = await VariationModel.findById(id);

    respondSuccess(res, 200, variation);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const variation = await VariationModel.findByIdAndDelete(id);

    respondSuccess(res, 200, variation);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const variation = await VariationModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, variation);
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
