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

function checkforAuthenticationCookie(req, res, next) {
  const cookieValue = req.cookies.token;
  if (!cookieValue) return next();

  try {
    const userPayload = JWT.verify(cookieValue, SECRET);
    req.user = userPayload;
  } catch (error) {}

  return next();
}

module.exports = {
  checkforAuthenticationCookie,
  createTokenForUser,
};
