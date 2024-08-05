const Url = require('../models/url');
const { customAlphabet } = require('nanoid')

async function handleShortenUrl(req, res) {
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({
            success: false,
            message: 'Please provide a url'
        })
    }
    // create shorten url
    const nanoid = customAlphabet(originalUrl, 8)
    const shortUrlId = nanoid();

    const url = new Url({
        originalUrl: originalUrl,
        shortUrlId: shortUrlId,
        analytics: {
            visitHistory: []
        }
    })
    await url.save();

    return res.status(200).json({
        success: true,
        shortUrlId: shortUrlId
    })
}


module.exports = { 
    handleShortenUrl

}