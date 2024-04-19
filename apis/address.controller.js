/**
 * dev: ManhThai
 */

const { addressModel, userModel } = require("../models/bookStore.model");

const getAll = async (req, res) => {
  try {
    const { id_user } = req.query;

    const user = await userModel.findById(id_user).populate("address");

    // user not found
    if (!user) {
      return res.apiError("User not found!");
    }

    const addresses = user.address;

    // finally success
    return res.apiSuccess({ data: addresses });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const add = async (req, res) => {
  try {
    const { id_user } = req.query;

    const user = await userModel.findById(id_user);

    // user not found
    if (!user) {
      return res.apiError("User not found!");
    }

    const newAddress = new addressModel(req.body);
    await newAddress.save();
    await user.updateOne({ $push: { address: newAddress.id } });

    // finally success.
    return res.apiSuccess({ data: newAddress });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const get = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await addressModel.findById(id);

    // data not found
    if (!address) {
      return res.apiError("Data not found!");
    }

    // finally success
    return res.apiSuccess({ data: address });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const removedAddress = await addressModel.findByIdAndDelete(id, {
      new: true,
    });

    // data not found
    if (!removedAddress) {
      return res.apiError("Data not found!");
    }

    // finally success
    return res.apiSuccess({ data: removedAddress });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

const set = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAddress = await addressModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // data not found
    if (!updatedAddress) {
      return res.apiError("Data not found!");
    }

    // finally success
    return res.apiSuccess({ data: updatedAddress });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

module.exports = { getAll, add, get, remove, set };
