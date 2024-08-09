const express = require('express');
const { getHomepage, getLoginPage, getSignupPage } = require('../controllers/static')
const router = express.Router();


router.route("/home").get(getHomepage)

router.route("/login").get(getLoginPage)

router.route("/signup").get(getSignupPage)

module.exports = router