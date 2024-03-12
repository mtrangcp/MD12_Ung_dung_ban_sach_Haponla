/**
 * dev: Manh Thai
 */
const { CategoryModel } = require("../../models/category.model");

const getAll = async (req, res) => {
  const allData = await CategoryModel.find();

  const status = req.query.status;
  const message = req.query.message;

  return res.render("category/main", {
    title: "Category Manager",
    data: allData,
    status,
    message,
  });
};

const add = async (req, res) => {
  console.log(req.body);

  const data = new CategoryModel(req.body);
  await data.save();

  let status = true;
  let message = `added: ${data.name}`;

  return res.redirect(`/categories?status=${status}&message=${message}`);
};

const set = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  let status = true;
  let message = `updated: ${data.name}`;

  return res.redirect(`/categories?status=${status}&message=${message}`);
};

module.exports = {
  getAll,
  // get,
  add,
  // remove,
  set,
};
