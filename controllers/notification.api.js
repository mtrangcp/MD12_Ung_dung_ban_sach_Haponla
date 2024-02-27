var { notificationModel, userModel } = require('../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.getListNotification = async (req, res, next) => {
    let listNotification = [];

    try {
        listNotification = await notificationModel.find();
        if (listNotification) {
            objReturn.data = listNotification;
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

exports.getOneNotification = async (req, res, next) => {
    try {
        const id = req.params.id;

        const notification = await notificationModel.findById(id);

        if (notification) {
            objReturn.data = notification;
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

exports.addNotification = async (req, res, next) => {

    try {
        const newData = req.body;
        const checkContent = await notificationModel.findOne({ content: req.body.content });
        const checkTitle = await notificationModel.findOne({ title: req.body.title });

        if ((checkTitle === null) && (checkContent === null)) {
            const dataRes = await notificationModel.create(newData);
            return res.status(200).json({ message: dataRes })
        } else {
            return res.status(400).json({ message: "Thong bao da ton tai" })
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
        const result = await notificationModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.deleteNotification = async (req, res, next) => {

    try {
        const id = req.params.id;

        await userModel.deleteMany({ notifications: id })

        const result = await notificationModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}




