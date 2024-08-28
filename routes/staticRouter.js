const express = require('express');
const { getHomepage, getLoginPage, getSignupPage } = require('../controllers/static')
const { restrictToLoginUsersOnly } = require('../middlewares/auth')

const router = express.Router();


router.get("/home", restrictToLoginUsersOnly, getHomepage)

router.route("/login").get(getLoginPage)

router.route("/signup").get(getSignupPage)

module.exports = router