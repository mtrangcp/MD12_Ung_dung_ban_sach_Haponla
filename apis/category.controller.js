/**
 * dev: ManhThai
 */
const { CategoryModel } = require("../models/category");

const getAll = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    // data empty
    if (!categories) {
      return res.apiError("Data is empty!");
    }

    // finally success
    return res.apiSuccess({ data: categories });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

module.exports = {
  getAll,
};
