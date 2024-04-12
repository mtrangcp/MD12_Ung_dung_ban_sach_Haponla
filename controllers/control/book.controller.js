/**
 * dev: Manh Thai
 */
const { BookModel } = require("../../models/book");
const { CategoryModel } = require("../../models/category");

const getAll = async (req, res) => {
  const allData = await BookModel.find();

  const options = await CategoryModel.find();
  const data = allData;
  for (const item of data) {
    const itemCategory = await CategoryModel.findById(item.id_category);
    item.category = itemCategory? itemCategory.name : "unknown";
  }
  const status = req.query.status;
  const message = req.query.message;

  return res.render("book/main", {
    title: "Book Manager",
    data,
    options,
    status,
    message,
  });
};

const add = async (req, res) => {
  console.table(req.body);

  const data = new BookModel(req.body);
  await data.save();

  let status = true;
  let message = `added: ${data.name}`;

  return res.redirect(`/books?status=${status}&message=${message}`);
};

const remove = async (req, res) => {
  const {id} = req.params

  const data = await BookModel.findByIdAndDelete(id)

  let status = true;
  let message = `deleted: ${data.name}`;

  return res.redirect(`/books?status=${status}&message=${message}`);
}

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
