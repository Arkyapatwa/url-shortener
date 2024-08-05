const express = require('express');
const router = express.Router();

const { handleShortenUrl } = require('../controllers/url')

router.route("/").post(handleShortenUrl)


module.exports = router