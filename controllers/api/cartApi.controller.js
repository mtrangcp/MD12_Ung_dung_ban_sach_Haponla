const { CartModel } = require("../../models/cart.model");

exports.getListCart = async (req, res) => {
  const allData = await CartModel.find();
  return res.apiSuccess({ data: allData });
};

exports.addCart = async (req, res) => {
  console.log(req.body);
  const data = new CartModel(req.body);
  await data.save();

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.getOneCart = async (req, res) => {
  const { id } = req.params;

  const data = await CartModel.findById(id);

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("not found");
  }
};

exports.deleteCart = async (req, res) => {
  const { id } = req.params;

  const data = await CartModel.findByIdAndDelete(id, { new: true });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};

exports.updateCart = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await CartModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (data) {
    return res.apiSuccess({ data });
  } else {
    return res.apiError("something's wrong, try another");
  }
};
