/**
 * dev: ManhThai
 */
const { userModel } = require("../models/bookStore.model");
const { CartModel } = require("../models/cart");

const getAll = async (req, res) => {
  try {
    const { id_user } = req.query;

    const user = await userModel.findById(id_user).populate("carts");
    console.log(`user::: ${user}`);
    const carts = user.carts;

    // data empty
    if (!carts) {
      return res.apiError("Data is empty!");
    }

    // finally success
    return res.apiSuccess({ data: carts });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const add = async (req, res) => {
  try {
    const { id_user } = req.query;

    const newCart = new CartModel(req.body);

    const user = await userModel.findById(id_user).populate("carts");
    const carts = user.carts;

    // user not found
    if (!user) {
      return res.apiError("User not found!");
    }

    // cart already exists
    var existsCart = false;

    carts.forEach((item) => {
      if ("" + newCart.id_book === "" + item.id_book) {
        existsCart = true;

        return;
      }
    });

    if (existsCart) {
      return res.apiError("Cart is exists!");
    }

    // finally success
    await newCart.save();
    await user.updateOne({ $push: { carts: newCart } });

    return res.apiSuccess({ data: newCart });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const removedCart = await CartModel.findByIdAndDelete(id, { new: true });

    // cart not found
    if (!removedCart) {
      return res.apiError("Data not found!");
    }

    // finally success
    return res.apiSuccess({ data: removedCart });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const set = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCart = await CartModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // cart not found
    if (!updatedCart) {
      return res.apiError("Data not found!");
    }

    // finally success
    return res.apiSuccess({ data: updatedCart });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

module.exports = {
  getAll,
  add,
  remove,
  set,
};
