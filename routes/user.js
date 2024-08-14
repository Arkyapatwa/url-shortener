const express = require('express');
const router = express.Router();

const { handleRegister, handleLogin } = require('../controllers/user')

router.route("/registerUser").post(handleRegister)

router.route("/loginUser").post(handleLogin)

module.exports = router