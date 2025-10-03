const JWT = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secretKey);
  return token;
}

function validateToken(token) {
  // use the same secretKey that was used to sign the token
  const payload = JWT.verify(token, secretKey);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};