/**
 * dev: Manh Thai
 */
const {
  discountModel,
  userModel,
  item_discountModel,
} = require("../../models/bookStore.model");

const getAll = async (req, res) => {
  const allData = await discountModel.find();

  const status = req.query.status;
  const message = req.query.message;

  return res.render("discount/main", {
    title: "Discount Manager",
    data: allData,
    status,
    message,
  });
};

const add = async (req, res) => {
  console.log(req.body);

  const data = new discountModel(req.body);
  await data.save();

  const itemDiscount = new item_discountModel({
    id_discount: data.id,
    status: data.status,
  });
  await itemDiscount.save();
  await userModel.updateMany({}, { $push: { discounts: itemDiscount.id } });

  let status = true;
  let message = `added: ${data.codename}`;

  return res.redirect(`/discounts?status=${status}&message=${message}`);
};

const set = async (req, res) => {
  console.log(req.body);
  const { id } = req.params;

  const data = await discountModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  let status = true;
  let message = `updated: ${data.codename}`;

  return res.redirect(`/discounts?status=${status}&message=${message}`);
};

module.exports = {
  getAll,
  // get,
  add,
  // remove,
  set,
};
