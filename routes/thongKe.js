var express = require('express');
var router = express.Router();
var thongKeCtrl = require('../controllers/control/thongKe.controller');
var check_login = require('../middlewares/checkLogin');
const { log } = require('console');

router.use((req, res, next) => {
    console.log('===> goi middleware ===>');
    next();
});

router.get('/', check_login.yeu_cau_login, thongKeCtrl.getThongKe);


module.exports = router;

