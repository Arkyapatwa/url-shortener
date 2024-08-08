const Url= require("../models/url");

async function getHomepage(req, res) {
  const urls = await Url.find({});
  return res.render("home", { urls: urls });
}

module.exports = { getHomepage }