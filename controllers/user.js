const User = require("../models/user");
const { getUser, setUser } = require("../service/auth");

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

  return res.render("login", {message: "Registered Successfully"});
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (user.password !== password) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const token = setUser(user);
  res.cookie("session", token)
  return res.redirect("/home");
}

async function handleLogout(req, res) {
  if (!req.cookies?.session) {
    return res.redirect("/login");
  }
  res.clearCookie("session");
  return res.redirect("/login");
}

module.exports = { handleRegister, handleLogin, handleLogout };
