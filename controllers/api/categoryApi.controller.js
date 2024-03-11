const { CategoryModel } = require("../../models/category.model");

const getAll = async (req, res) => {
  const categories = await CategoryModel.find();
  return res.apiSuccess({ data: categories });
};

const add = async (req, res) => {
  console.log(req.body);
  const category = new CategoryModel(req.body);
  await category.save();

  if (category) {
    return res.apiSuccess({ data: category });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const get = async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.findById(id);

  if (category) {
    return res.apiSuccess({ data: category });
  } else {
    return res.apiError("not found");
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id, { new: true });

  if (category) {
    return res.apiSuccess({ data: category });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

const set = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (category) {
    return res.apiSuccess({ data: category });
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
