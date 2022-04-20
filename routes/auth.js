var express = require('express');
var router = express.Router();

authController = require('../controllers/auth-controller')

router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
