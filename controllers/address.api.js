var { addressModel, userModel } = require('../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.getListAddress = async (req, res, next) => {
    let listAddress = [];

    try {
        listAddress = await addressModel.find();
        if (listAddress) {
            objReturn.data = listAddress;
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

exports.getOneAddress = async (req, res, next) => {
    try {
        const id = req.params.id;

        const address = await addressModel.findById(id);

        if (address) {
            objReturn.data = address;
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

exports.addAddress = async (req, res, next) => {

    try {
        const newData = req.body;
        const checkUsername = await addressModel.findOne({ username: req.body.username })
        const checkPhone = await addressModel.findOne({ phone: req.body.phone })
        const checkLocation = await addressModel.findOne({ location: req.body.location })

        if ((checkUsername === null) && (checkPhone === null) && (checkLocation === null)) {
            const dataRes = await addressModel.create(newData);
            return res.status(200).json({ message: dataRes })
        } else {
            return res.status(400).json({ message: "Address da ton tai" })
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.updateAddress = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await addressModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.deleteAddress = async (req, res, next) => {

    try {
        const id = req.params.id;

        await userModel.deleteMany({ address: id })

        const result = await addressModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}




