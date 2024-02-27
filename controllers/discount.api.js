var { discountModel, item_discountModel, userModel } = require('../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}


exports.getListDiscount = async (req, res, next) => {
    let listDiscount = [];

    try {
        listDiscount = await discountModel.find();
        if (listDiscount) {
            objReturn.data = listDiscount;
            objReturn.status = 1;
            objReturn.msg = 'lay thanh cong'

        } else {
            objReturn.status = 0;
            objReturn.msg = 'k co du lieu'
        }

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.getOneDiscount = async (req, res, next) => {
    try {
        const id = req.params.id;

        const discount = await discountModel.findById(id);

        if (discount) {
            objReturn.data = discount;
            objReturn.status = 1;
            objReturn.msg = 'lay thanh cong'

        } else {
            objReturn.status = 0;
            objReturn.msg = 'k co du lieu'
        }

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.addDiscount = async (req, res, next) => {

    try {
        const newData = req.body;
        const checkCodename = await discountModel.findOne({ codename: req.body.codename })
        const checkValue = await discountModel.findOne({ value: req.body.value })
        if ((checkCodename === null) && (checkValue === null)) {
            const dataRes = await discountModel.create(newData);
            return res.status(200).json({ message: dataRes })
        } else {
            return res.status(400).json({ message: "Discount da ton tai" })
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.updateDiscount = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await discountModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.deleteDiscount = async (req, res, next) => {

    try {
        const id = req.params.id;

        await userModel.deleteMany({ discounts: id })

        const result = await discountModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}




