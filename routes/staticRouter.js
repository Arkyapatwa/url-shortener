const express = require('express');
const { getHomepage, getAdminHomepage, getLoginPage, getSignupPage } = require('../controllers/static')
const { restrictTo, checkAuth } = require('../middlewares/auth')

const router = express.Router();


router.get("/home", restrictTo("USER","ADMIN"), getHomepage)

router.route("/login").get(getLoginPage)

router.route("/signup").get(getSignupPage)

router.route("/admin/urls").get(restrictTo("ADMIN"), getAdminHomepage)

module.exports = router