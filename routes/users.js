var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/control/user.controller');
var check_login = require('../middlewares/checkLogin');
const { log } = require('console');

router.use((req, res, next) => {
  console.log('===> goi middleware ===>');
  next();
});

router.get('/', check_login.yeu_cau_login, userCtrl.getListUser);

router.get('/login', userCtrl.login);
router.post('/login', userCtrl.login);

router.get('/ban/:iduser', userCtrl.banUser);
router.post('/ban/:iduser', userCtrl.banUser);

router.get('/unban/:iduser', userCtrl.unbanUser);
router.post('/unban/:iduser', userCtrl.unbanUser);

module.exports = router;
