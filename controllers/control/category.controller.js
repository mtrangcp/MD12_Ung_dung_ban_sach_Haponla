const { CategoryModel } = require("../../models/category.model");
const { respondError, respondSuccess } = require("../../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();

    respondSuccess(res, 200, categories);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const category = new CategoryModel(req.body);
    await category.save();

    respondSuccess(res, 201, category);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    respondSuccess(res, 200, category);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    respondSuccess(res, 200, category);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, category);
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
