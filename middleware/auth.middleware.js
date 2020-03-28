const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const [, token] = req.headers.authorization.split(' ') // Bearer {token}

        if (!token) {
            res.status(401).json({ message: 'Authorization error' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        res.status(401).json({ message: 'Authorization error' })
    }
}
