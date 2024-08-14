const { getUser } = require('../service/auth')

async function restrictToLoginUsersOnly(req, res, next) {
    const session = req.cookies?.session

    if (!session) {
        return res.redirect('/user/login')
    }

    const user = getUser(session)

    if (!user) {
        return res.redirect('/user/login')
    }

    req.user = user
    next()
}

module.exports = {
    restrictToLoginUsersOnly
}