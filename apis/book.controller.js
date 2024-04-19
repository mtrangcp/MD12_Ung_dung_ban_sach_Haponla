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

const get = async (req, res) => {
  try {
    console.log(req.params);
    const {id} = req.params

    const book = await BookModel.findById(id).populate("id_category");

    // data empty
    if (!book) {
      return res.apiError("Data is empty!");
    }

    // finally success
    return res.apiSuccess({ data: book });
  } catch (error) {
    return res.apiInternalError(error);
  }
};

module.exports = {
  getAll,
  get
};
