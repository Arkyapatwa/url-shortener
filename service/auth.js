const jwt = require("jsonwebtoken");

function setUser(user) {
  return jwt.sign(
    {
      email: user.email,
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
}

function getUser(token) {
  if (!token) return null;
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { setUser, getUser };
