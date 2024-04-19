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

router.get('/chitiet/:idBill', billCtrl.chitietBill);
router.post('/chitiet/:idBill', billCtrl.chitietBill);

router.get('/tienThapCao/:idUser', billCtrl.getBillUserTienThapCao);
router.post('/tienThapCao/:idUser', billCtrl.getBillUserTienThapCao);
router.get('/tienCaoThap/:idUser', billCtrl.getBillUserTienCaoThap);
router.post('/tienCaoThap/:idUser', billCtrl.getBillUserTienCaoThap);

router.get('/tgMoi/:idUser', billCtrl.getBillUserTgMoi);
router.post('/tgMoi/:idUser', billCtrl.getBillUserTgMoi);
router.get('/tgCu/:idUser', billCtrl.getBillUserTgCu);
router.post('/tgCu/:idUser', billCtrl.getBillUserTgCu);

router.get('/0/:idUser', billCtrl.getBillUser0);
router.post('/0/:idUser', billCtrl.getBillUser0);
router.get('/1/:idUser', billCtrl.getBillUser1);
router.post('/1/:idUser', billCtrl.getBillUser1);
router.get('/2/:idUser', billCtrl.getBillUser2);
router.post('/2/:idUser', billCtrl.getBillUser2);
router.get('/3/:idUser', billCtrl.getBillUser3);
router.post('/3/:idUser', billCtrl.getBillUser3);
router.get('/4/:idUser', billCtrl.getBillUser4);
router.post('/4/:idUser', billCtrl.getBillUser4);

router.get('/tienThapCao', billCtrl.getBillUserTienThapCao);
router.post('/tienThapCao', billCtrl.getBillUserTienThapCao);
router.get('/tienCaoThap', billCtrl.getBillUserTienCaoThap);
router.post('/tienCaoThap', billCtrl.getBillUserTienCaoThap);

router.get('/tgMoi', billCtrl.getBillUserTgMoi);
router.post('/tgMoi', billCtrl.getBillUserTgMoi);
router.get('/tgCu', billCtrl.getBillUserTgCu);
router.post('/tgCu', billCtrl.getBillUserTgCu);

router.get('/status/:status', billCtrl.getBillWithStatus);
router.post('/status/:status', billCtrl.getBillWithStatus);
// router.get('/1', billCtrl.getBillUser1);
// router.post('/1', billCtrl.getBillUser1);
// router.get('/2', billCtrl.getBillUser2);
// router.post('/2', billCtrl.getBillUser2);
// router.get('/3', billCtrl.getBillUser3);
// router.post('/3', billCtrl.getBillUser3);
// router.get('/4', billCtrl.getBillUser4);
// router.post('/4', billCtrl.getBillUser4);


module.exports = router;
