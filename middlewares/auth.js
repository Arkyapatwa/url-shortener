const { getUser } = require('../service/auth')

async function restrictToLoginUsersOnly(req, res, next) {
    console.log(req)
    const session = req.cookies?.session
    console.log(session)

    if (!session) {
        return res.redirect('/login')
    }

    const user = getUser(session)

    if (!user) {
        return res.redirect('/login')
    }

    req.user = user
    next()
}

module.exports = {
    restrictToLoginUsersOnly
}