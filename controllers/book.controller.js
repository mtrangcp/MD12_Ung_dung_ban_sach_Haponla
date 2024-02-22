const { BookModel } = require("../models/book.model");

const { respondError, respondSuccess } = require("../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const books = await BookModel.find();

    respondSuccess(res, 200, books);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const book = new BookModel(req.body);
    await book.save();

    respondSuccess(res, 201, book);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    respondSuccess(res, 200, book);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await BookModel.findByIdAndDelete(id);

    respondSuccess(res, 200, book);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const book = await BookModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, book);
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
