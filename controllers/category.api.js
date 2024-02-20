var { addressModel, discountModel, item_discountModel, notificationModel, userModel } = require('../../tranghtm_datn/models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}


exports.getListCategory = async (req, res, next) => {
    let listCategory = [];

    try {
        listUser = await userModel.find();
        if (listUser) {
            objReturn.data = listUser;
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

exports.getOneCategory = async (req, res, next) => {
    try {
        const id = req.params.id;

        const user = await userModel.findById(id);

        if (user) {
            objReturn.data = user;
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

exports.addCategory = async (req, res, next) => {

    try {
        const newData = req.body;
        const checkEmail = await userModel.findOne({ email: req.body.email })
        const checkUsername = await userModel.findOne({ username: req.body.username })
        if ((checkEmail === null) && (checkUsername === null)) {
            const dataRes = await userModel.create(newData);
            return res.status(200).json({ message: dataRes })
        } else {
            return res.status(400).json({ message: "Account da ton tai" })
        }
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.updateCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await userModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.deleteCategory = async (req, res, next) => {

    try {
        const id = req.params.id;

        // await blModel.deleteMany({ idUser: id })

        const result = await userModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}




