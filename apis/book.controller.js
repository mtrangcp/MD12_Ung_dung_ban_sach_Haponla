/**
 * dev: ManhThai
 */
const { BookModel } = require("../models/book");

const getAll = async (req, res) => {
  try {
    console.log(req.query);

    const books = await BookModel.find(req.query).populate("id_category");

    // data empty
    if (!books) {
      return res.apiError("Data is empty!");
    }

    // finally success
    return res.apiSuccess({ data: books });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

module.exports = {
  getAll,
};
