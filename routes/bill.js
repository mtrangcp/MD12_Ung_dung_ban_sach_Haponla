var express = require('express');
var router = express.Router();
var billCtrl = require('../controllers/control/bill.controller');
var check_login = require('../middlewares/checkLogin');
const { log } = require('console');

router.use((req, res, next) => {
    console.log('===> goi middleware ===>');
    next();
});

router.get('/', check_login.yeu_cau_login, billCtrl.getListBill);

router.get('/:idUser', billCtrl.getBillUsername);
router.post('/:idUser', billCtrl.getBillUsername);

router.get('/status/:id', billCtrl.changeStatus);
router.post('/status/:id', billCtrl.changeStatus);

router.get('/thapCao', billCtrl.getThapCao);
router.post('/thapCao', billCtrl.getThapCao);
router.get('/caoThap', billCtrl.getCaoThap);
router.post('/caoThap', billCtrl.getCaoThap);

router.get('/chitiet/:idBill', billCtrl.chitietBill);
router.post('/chitiet/:idBill', billCtrl.chitietBill);






module.exports = router;
