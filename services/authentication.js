const JWT = require('jsonwebtoken');
const SECRET = '@22Hems';

function createTokenForUser(user) {
  const payload = {
    fullName: user.fullName,
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, SECRET);
  return token;
}

function validateToken(token) {
  const validatedToken = JWT.verify(token, SECRET);
  return validatedToken;
}

function authenticateJWTforLocals(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.locals.fullName = 'Guest';
    return next();
  }

  try {
    const user = JWT.verify(token, SECRET);
    req.user = user;
    console.log('hehe', req.user);

    res.locals.fullName = user.fullName;
  } catch (error) {
    res.locals.fullName = 'Guest';
  }
  next();
}

module.exports = {
  authenticateJWTforLocals,
  createTokenForUser,
  validateToken,
};
