const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin } = require('../controllers/user')

router.route("/register").post(handleRegister)

router.route("/login").post(handleLogin)

module.exports = router