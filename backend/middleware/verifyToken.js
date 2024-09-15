const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract the Bearer token

    if (!token) {
      console.log('no token');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log('invalid token')
            return res.status(403).json({ message: 'Invalid token.' });
        }
        console.log('valid token')
        req.userId = decoded._id; // Set userId from the decoded token payload
        console.log(`userid obtained ${req.userId}`);
        next();
    });
};

module.exports = verifyToken;
