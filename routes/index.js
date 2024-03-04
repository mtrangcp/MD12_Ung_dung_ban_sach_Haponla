var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/control/index.controller');


router.get('/', homeCtrl.index);

module.exports = router;
