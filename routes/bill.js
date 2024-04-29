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

router.get('/changeStatus/:id', billCtrl.changeStatus);
router.post('/changeStatus/:id', billCtrl.changeStatus);

router.get('/chitiet/:idBill', billCtrl.chitietBill);
router.post('/chitiet/:idBill', billCtrl.chitietBill);

router.get('/sx/tongThapCao', billCtrl.getTongThapCao);
router.post('/sx/tongThapCao', billCtrl.getTongThapCao);
router.get('/sx/tongCaoThap', billCtrl.getTongCaoThap);
router.post('/sx/tongCaoThap', billCtrl.getTongCaoThap);

router.get('/sx/tgMoi', billCtrl.getBillTgMoi);
router.post('/sx/tgMoi', billCtrl.getBillTgMoi);
router.get('/sx/tgCu', billCtrl.getBillTgCu);
router.post('/sx/tgCu', billCtrl.getBillTgCu);

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


router.get('/status/:status', billCtrl.getBillWithStatus);
router.post('/status/:status', billCtrl.getBillWithStatus);

module.exports = router;
