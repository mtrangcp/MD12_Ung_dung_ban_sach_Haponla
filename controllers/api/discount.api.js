var { discountModel, item_discountModel, userModel } = require('../../models/bookStore.model');

var objReturn = {
    status: 1,
    msg: 'ok'
}

exports.getListDiscountConHSD = async (req, res, next) => {
    let listDiscount = [];

    try {
        const today = new Date(); // Ngày hiện tại
        listDiscount = await discountModel.find({ end_date: { $gte: today } });
        
        if (listDiscount) {
            objReturn.data = listDiscount;
            objReturn.status = 1;
            objReturn.msg = 'lay thanh cong list discount con hsd'

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

exports.getListDiscountSpinner = async (req, res, next) => {
    const id = req.params.idU;
    const objUser = await userModel.findById(id);
    console.log(objUser);
    var listIdDiscountItem = [];
    var listDiscountItem = [];
    var listIdDiscount = [];
    var listDiscount = [];

    if (objUser) {
        listIdDiscountItem = objUser.discounts;
        if (listIdDiscountItem) {
            console.log("--------------------->>listIdDiscountItem ok");
            console.log(listIdDiscountItem);

            for (const idItem of listIdDiscountItem) {
                var newDiscount = await item_discountModel.findOne(idItem);
                listDiscountItem.push(newDiscount);
            }
            console.log("\n--------------------->>listDiscountItem ok");
            console.log(listDiscountItem);

            for (const item of listDiscountItem) {
                if (item.status == true) {
                    listIdDiscount.push(item.id_discount);
                }
            }
            console.log("--------------------->>listIdDiscount ok");
            console.log(listIdDiscount);

            for (const item of listIdDiscount) {
                var newDiscount = await discountModel.findOne(item);
                listDiscount.push(newDiscount);
            }
            console.log("--------------------->>listDiscount ok");
            console.log(listDiscount);


            if (listDiscount) {
                objReturn.data = listDiscount;
                objReturn.status = 1;
                objReturn.msg = 'lay thanh cong'

            } else {
                objReturn.status = 0;
                objReturn.msg = 'k co du lieu'
            }
        }
    } else {
        console.log("k tim thay du lieu");
        objReturn.status = 0;
        objReturn.msg = 'k co du lieu'
    }
    return res.json(objReturn);
}

exports.getListWithIdUser = async (req, res, next) => {
    const id = req.params.idU;
    const objUser = await userModel.findById(id);
    console.log(objUser);
    var listIdDiscountItem = [];
    var listDiscountItem = [];
    var listIdDiscount = [];
    var listDiscount = [];

    if (objUser) {
        listIdDiscountItem = objUser.discounts;
        if (listIdDiscountItem) {
            console.log("--------------------->>listIdDiscountItem ok");
            console.log(listIdDiscountItem);

            for (const idItem of listIdDiscountItem) {
                var newDiscountItem = await item_discountModel.findOne(idItem);
                listDiscountItem.push(newDiscountItem);
            }
            console.log("\n--------------------->>listDiscountItem ok");
            console.log(listDiscountItem);

            for (const item of listDiscountItem) {
                listIdDiscount.push(item.id_discount);
            }
            console.log("--------------------->>listIdDiscount ok");
            console.log(listIdDiscount);

            for (const item of listIdDiscount) {
                var newDiscount = await discountModel.findOne(item);
                listDiscount.push(newDiscount);
            }
            console.log("--------------------->>listDiscount ok");
            console.log(listDiscount);


            if (listDiscount) {
                objReturn.data = listDiscount;
                objReturn.status = 1;
                objReturn.msg = 'lay thanh cong'

            } else {
                objReturn.status = 0;
                objReturn.msg = 'k co du lieu'
            }
        }
    } else {
        console.log("k tim thay du lieu");
        objReturn.status = 0;
        objReturn.msg = 'k co du lieu'
    }
    return res.json(objReturn);
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

        await userModel.deleteMany({ discounts: id });

        const result = await discountModel.findByIdAndDelete(id);
        return res.status(200).json(result);
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.getListDiscountItem = async (req, res, next) => {
    let listDiscountItem = [];

    try {
        listDiscountItem = await item_discountModel.find();
        if (listDiscountItem) {
            objReturn.data = listDiscountItem;
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

exports.getListDiscountItemWithUser = async (req, res, next) => {
    const id = req.params.idU;
    const objUser = await userModel.findById(id);
    console.log(objUser);
    var listIdDiscountItem = [];
    var listDiscountItem = [];
    
    if (objUser) {
        listIdDiscountItem = objUser.discounts;
        if (listIdDiscountItem) {
            console.log("--------------------->>listIdDiscountItem ok");
            console.log(listIdDiscountItem);

            for (const idItem of listIdDiscountItem) {
                var newDiscountItem = await item_discountModel.findOne(idItem);
                listDiscountItem.push(newDiscountItem);
            }
            console.log("\n--------------------->>listDiscountItem ok");
            console.log(listDiscountItem);

            if (listDiscountItem) {
                objReturn.data = listDiscountItem;
                objReturn.status = 1;
                objReturn.msg = 'lay thanh cong'

            } else {
                objReturn.status = 0;
                objReturn.msg = 'k co du lieu'
            }
        }
    } else {
        console.log("k tim thay du lieu");
        objReturn.status = 0;
        objReturn.msg = 'k co du lieu'
    }
    return res.json(objReturn);
}

exports.addDiscountItem = async (req, res, next) => {

    try {
        const newData = req.body;
        const dataRes = await item_discountModel.create(newData);
        return res.status(200).json({ message: dataRes })
       
    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.updateDiscountItem = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const result = await item_discountModel.findByIdAndUpdate(id, updatedData, { new: true });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}

exports.addDiscountToUser = async (req, res, next) => {
    try {
        const id_user = req.params.idU;
        const user = await userModel.findById(id_user).populate("discounts");
        const discounts = user.discounts;
        
        const newDiscountItem = await item_discountModel.create(req.body);
        const result = await user.updateOne({ $push: { discounts: newDiscountItem } });

        return res.status(200).json(result);

    } catch (error) {
        objReturn.status = 0;
        objReturn.msg = error.msg;
    }

    return res.json(objReturn);
}



