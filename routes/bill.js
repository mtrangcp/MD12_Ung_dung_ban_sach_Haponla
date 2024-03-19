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

router.get('/:idU', billCtrl.getBillUsername);
router.post('/:idU', billCtrl.getBillUsername);


module.exports = router;
