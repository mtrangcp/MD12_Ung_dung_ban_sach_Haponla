/**
 * dev: ManhThai
 */
const { BookModel } = require("../../models/book.model");

const getAll = async (req, res) => {
  try {
    const { id_category } = req.query;
    var books;

    if (id_category) {
      books = await BookModel.find({ id_category }).populate("id_category");
    } else {
      books = await BookModel.find().populate("id_category");
    }

    return res.apiSuccess({ data: books });
  } catch (error) {
    return res.apiError(error);
  }
};

const add = async (req, res) => {
  console.log(req.body);
  const data = new BookModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  const data = await BookModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const data = await BookModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const set = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await BookModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

module.exports = {
  getAll,
  get,
  add,
  remove,
  set,
};
