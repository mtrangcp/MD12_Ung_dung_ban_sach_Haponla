/**
 * dev: Manh Thai
 */
const { BookModel, VariationModel } = require("../../models/book");
const { CategoryModel } = require("../../models/category");

const getAll = async (req, res) => {
  try {
    const { id_category, status, message } = req.query;

    let books;
    if (id_category) {
      books = await BookModel.find({ id_category }).populate("id_category");
    } else {
      books = await BookModel.find().populate("id_category");
    }

    const categories = await CategoryModel.find();

    return res.render("book/main", {
      title: "Book Manager",
      data: books,
      options: categories,
      status,
      message,
    });
  } catch (error) {
    return res.render("error", { error, message: error.message });
  }
};

const add = async (req, res) => {
  console.log(req.body);

  const data = new BookModel(req.body);
  await data.save();

  const variationLength = req.body.language.length;
  for (let i = 0; i < variationLength; i++) {
    const newVariation = new VariationModel({
      language: req.body.language[i],
      republish: req.body.republish[i],
    });
    await newVariation.save();
    await data.updateOne({ $push: { variations: newVariation } });
  }

  let status = true;
  let message = `added: ${data.name}`;

  return res.redirect(`/books?status=${status}&message=${message}`);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const data = await BookModel.findByIdAndDelete(id);

  let status = true;
  let message = `deleted: ${data.name}`;

  return res.redirect(`/books?status=${status}&message=${message}`);
};

const set = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await BookModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  let status = true;
  let message = `updated: ${data.name}`;

  return res.redirect(`/books?status=${status}&message=${message}`);
};

module.exports = {
  getAll,
  // get,
  add,
  remove,
  set,
};
