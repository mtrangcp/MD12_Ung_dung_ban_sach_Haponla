const { CategoryModel } = require("../../models/category.model");

exports.getListCategory = async (req, res) => {
  const allData = await CategoryModel.find();
  return res.apiSuccess({ data: allData });
};

exports.addCategory = async (req, res) => {
  console.log(req.body);
  const data = new CategoryModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.getOneCategory = async (req, res) => {
  const { id } = req.params;

  const data = await CategoryModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const data = await CategoryModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.updateCategory = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await CategoryModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

