const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin, handleLogout } = require('../controllers/user')

router.route("/register").post(handleRegister)

router.route("/login").post(handleLogin)

router.route("/logout").post(handleLogout)

module.exports = router