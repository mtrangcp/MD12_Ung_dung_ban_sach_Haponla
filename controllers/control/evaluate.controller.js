const { EvaluateModel } = require("../../models/book.model");
const { respondError, respondSuccess } = require("../../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const evaluates = await EvaluateModel.find();

    respondSuccess(res, 200, evaluates);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const evaluate = new EvaluateModel(req.body);
    await evaluate.save();

    respondSuccess(res, 201, evaluate);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evaluate = await EvaluateModel.findById(id);

    respondSuccess(res, 200, evaluate);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const evaluate = await EvaluateModel.findByIdAndDelete(id);

    respondSuccess(res, 200, evaluate);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const evaluate = await EvaluateModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, evaluate);
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
