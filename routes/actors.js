var express = require('express');
var router = express.Router();
var jwtHelper = require('../helpers/jwt-helper');

router.get('/', jwtHelper.authenticateToken, function(req, res, next) {
    res.json('All actors')
});

module.exports = router;
