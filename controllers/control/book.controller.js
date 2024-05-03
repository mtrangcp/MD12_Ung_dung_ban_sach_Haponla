/**
 * dev: Manh Thai
 */
const { BookModel } = require("../../models/book");
const { CategoryModel } = require("../../models/category");

const getAll = async (req, res) => {
  try {
    const { id_category, status, message } = req.query;

    let books;
    if (id_category) {
      books = await BookModel.find({ id_category }).sort({_id:- 1}).populate("id_category");
    } else {
      books = await BookModel.find().sort({_id: -1}).populate("id_category");
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

  const { language, republish, stock } = req.body;

  var variations;
  if (
    !Array.isArray(language) ||
    !Array.isArray(republish) ||
    !Array.isArray(stock)
  ) {
    variations = { language, republish, stock };
  } else {
    variations = language.map((language, index) => ({
      language,
      republish: republish[index],
      stock: stock[index],
    }));
  }

  const newBook = new BookModel(req.body);
  await newBook.save();

  await newBook.updateOne({ $push: { variations: variations } });

  let status = true;
  let message = `Thêm thành công: ${newBook.name}`;

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

  const { language, republish, stock } = req.body;

  var variations;
  if (
    !Array.isArray(language) ||
    !Array.isArray(republish) ||
    !Array.isArray(stock)
  ) {
    variations = { language, republish, stock };
  } else {
    variations = language.map((language, index) => ({
      language,
      republish: republish[index],
      stock: stock[index],
    }));
  }

  console.log(`variations::: ${JSON.stringify(variations)}`);

  const { id } = req.params;

  const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  await updatedBook.updateOne({ variations: variations });

  let status = true;
  let message = `Cập nhật thành công: ${updatedBook.name}`;

  return res.redirect(`/books?status=${status}&message=${message}`);
};

module.exports = {
  getAll,
  // get,
  add,
  remove,
  set,
};
