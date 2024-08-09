const User = require("../models/user");

async function handleRegister(req, res) {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });
  await user.save();
  return res.status(200).json({
    success: true,
    message: "User created successfully",
  });
}

module.exports = { handleRegister };
