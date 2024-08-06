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

async function handleVisitUrl(req, res) {
    const { shortUrlId } = req.params;

    const event = await Url.findOneAndUpdate(
        { shortUrlId: shortUrlId },
        {
            $push: {
                'analytics.visitHistory': {
                    accessedAt: Date.now(),
                    ip: req.ip
                }
            }
        }
    );
    
    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Url not found'
        })
    }   

    return res.redirect(event.originalUrl)
}

async function getAnalyticsOfUrl(req, res) {
    const { shortUrlId } = req.params;

    const event = await Url.findOne({ shortUrlId: shortUrlId });

    if (!event) {
        return res.status(404).json({
            success: false,
            message: 'Url not found'
        })
    }   

    return res.status(200).json({
        success: true,
        analytics: {
            visitHistory: event.analytics.visitHistory,
            clicks: event.analytics.visitHistory.length
        }
    })
}


module.exports = { 
    handleShortenUrl,
    handleVisitUrl,
    getAnalyticsOfUrl
}