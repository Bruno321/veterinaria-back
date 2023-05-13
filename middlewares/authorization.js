const jwt = require('jsonwebtoken');
const tokenKey = 'debugKey'

module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).json({
            ok: false,
            message: 'No cuentas con los permisios necesarios.'
        });
    }
    
    const token = req.headers.authorization
    try {
        
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded.user;
        next();

    } catch (error) {
        res.status(403).json({
            message: 'No cuentas con los permisios necesarios.'
        });
    }
    
}