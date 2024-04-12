
const { BookModel } = require("../../models/book");

exports.getListBook = async (req, res) => {
  const allData = await BookModel.find();
  return res.apiSuccess({ data: allData });
};

exports.addBook = async (req, res) => {
  console.log(req.body);
  const data = new BookModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.getOneBook = async (req, res) => {
  const { id } = req.params;

  const data = await BookModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  const data = await BookModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.updateBook = async (req, res) => {
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
