const { CartModel } = require("../../models/cart.model");
const { respondError, respondSuccess } = require("../../helpers/responseHelper");

const getAll = async (req, res, next) => {
  try {
    const carts = await CartModel.find();

    respondSuccess(res, 200, carts);
  } catch (error) {
    respondError(res, error);
  }
};

const add = async (req, res, next) => {
  try {
    // console.log(req.body);
    const cart = new CartModel(req.body);
    await cart.save();

    respondSuccess(res, 201, cart);
  } catch (error) {
    respondError(res, error);
  }
};

const get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findById(id);

    respondSuccess(res, 200, cart);
  } catch (error) {
    respondError(res, error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await CartModel.findByIdAndDelete(id);

    respondSuccess(res, 200, cart);
  } catch (error) {
    respondError(res, error);
  }
};

const set = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { id } = req.params;
    const cart = await CartModel.findByIdAndUpdate(id, req.body);

    respondSuccess(res, 200, cart);
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
