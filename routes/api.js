var express = require('express');
var router = express.Router();

var api_user = require('../controllers/api/user.api');
var api_discount = require('../controllers/api/discount.api');
var api_address = require('../controllers/api/address.api');
var api_notification = require('../controllers/api/notification.api');
var api_bill = require("../controllers/api/billApi.controller");


// bill
router.get('/bill', api_bill.getListBill);
router.get('/bill/:id', api_bill.getOneBill);
router.post('/bill/add', api_bill.addBill);
router.put('/bill/update/:id', api_bill.updateBill);
router.delete('/bill/delete/:id', api_bill.deleteBill);

// user
router.get('/user', api_user.getListUser);
router.get('/user/:id', api_user.getOneUser);
router.post('/user/add', api_user.addUser);
router.put('/user/update/:id', api_user.updateUser);
router.delete('/user/delete/:id', api_user.deleteUser);

router.post('/user/dn', api_user.dangNhap);

// discount
router.get('/discount', api_discount.getListDiscount);
router.get('/discount/:id', api_discount.getOneDiscount);
router.post('/discount/add', api_discount.addDiscount);
router.put('/discount/update/:id', api_discount.updateDiscount);
router.delete('/discount/delete/:id', api_discount.deleteDiscount);

// address
router.get('/address', api_address.getListAddress);
router.get('/address/:id', api_address.getOneAddress);
router.post('/address/add', api_address.addAddress);
router.put('/address/update/:id', api_address.updateAddress);
router.delete('/address/delete/:id', api_address.deleteAddress);

// notification
router.get('/notification', api_notification.getListNotification);
router.get('/notification/:id', api_notification.getOneNotification);
router.post('/notification/add', api_notification.addNotification);
router.put('/notification/update/:id', api_notification.updateAddress);
router.delete('/notification/delete/:id', api_notification.deleteNotification);


module.exports = router;