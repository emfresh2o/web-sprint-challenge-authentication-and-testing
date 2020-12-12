const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization ?
        req.headers.authorization.split(' ')[1] : ' ';
    }
    if (token) {
        jwt.verify(token, secret, (err, decodedToken => {
            if (err) {
                next({ apiCode: 401, apiMessage: 'Invalid credentials' });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        next({ apiCode: 401, apiMessage: 'Invalid credentials' });
    }
} catch (err) {
    next({ apiCode: 500, apiMessage: 'error validating credentials', err });
}