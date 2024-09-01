const Url = require("../models/url");

async function getHomepage(req, res) {
  const urls = await Url.find({createdBy: req.user._id});
  return res.render("home", { urls: urls });
}

async function getLoginPage(req, res) {
  return res.render("login");
}

async function getSignupPage(req, res) {
  return res.render("signup");
}

module.exports = { getHomepage, getLoginPage, getSignupPage };
