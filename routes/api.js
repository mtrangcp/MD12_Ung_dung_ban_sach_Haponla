var express = require('express');
var router = express.Router();

var api_user = require('../controllers/user.api');

router.get('/user', api_user.getListUser);
router.get('/user/:id', api_user.getOneUser);
router.post('/user/add', api_user.addUser);
router.put('/user/update/:id', api_user.updateUser);
router.delete('/user/delete/:id', api_user.deleteUser);

router.post('/user/dn', api_user.dangNhap);

module.exports = router;