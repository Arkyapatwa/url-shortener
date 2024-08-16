const express = require('express');
const router = express.Router();

const { handleShortenUrl, handleVisitUrl, getAnalyticsOfUrl } = require('../controllers/url')

router.route("/create").post(handleShortenUrl)

router.route("/:shortUrlId").get(handleVisitUrl)

router.route("/analytics/:shortUrlId").get(getAnalyticsOfUrl)


module.exports = router