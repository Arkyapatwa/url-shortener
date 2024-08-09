const express = require('express');
const router = express.Router();

const { handleRegister } = require('../controllers/user')

router.route("/user").post(handleRegister)

module.exports = router