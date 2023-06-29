const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    // accessing the token 
    const token = req.header('x-auth-token');

    //  checking if user has any token or not
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // if token exist than verify it
    const verified = jwt.verify(token, "passwordKey");

    // if not verified
    if (!verified) {
      return res.status(401).json({ message: 'Token verification failed, authorization denied' });
    }

    // if user is verified
    req.user = verified.id;  // assigning authorized id into user
    req.token = token;       // same for token as well
    // to move forward to the process, i.e. from middleware to server or client
    next();

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = auth;