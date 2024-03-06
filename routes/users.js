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

router.get('/admin', userCtrl.getAdmin);
router.post('/admin', userCtrl.getAdmin);

router.get('/admin/edit/:idadmin', userCtrl.editAdmin);
router.post('/admin/edit/:idadmin', userCtrl.editAdmin);

router.get('/admin/dmk/:idadmin', userCtrl.dmkAdmin);
router.post('/admin/dmk/:idadmin', userCtrl.dmkAdmin);

router.get('/ban/:iduser', userCtrl.banUser);
router.post('/ban/:iduser', userCtrl.banUser);

router.get('/unban/:iduser', userCtrl.unbanUser);
router.post('/unban/:iduser', userCtrl.unbanUser);

router.get('/chitiet/:iduser', userCtrl.chiTietUser);
router.post('/chitiet/:iduser', userCtrl.chiTietUser);

router.get('/thapCao', userCtrl.getListUserThapcao);
router.post('/thapCao', userCtrl.getListUserThapcao);

router.get('/caoThap', userCtrl.getListUserCaoThap);
router.post('/caoThap', userCtrl.getListUserCaoThap);



module.exports = router;
