const { getUser } = require('../service/auth')

function checkAuth(req, res, next) {
    const session = req.cookies?.session
    req.user = null
    if (!session) {
        return next()
    }
    const user = getUser(session)

    req.user = user
    return next()
}

function restrictTo(...roles) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login")
        
        if(!roles.includes(req.user.role)) {
            return res.end("UnAuthorized")
        }

        return next()
    }
}

module.exports = {
    checkAuth,
    restrictTo,
}