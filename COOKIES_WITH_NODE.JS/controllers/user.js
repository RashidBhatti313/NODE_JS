const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid Username or password" });

  const token = setUser(user);

  // res.cookie("uid", token, {
  // domain: ".google.com" // all doamin per ja skt ho . ka mtlab ye ha
  // });
  // res.cookie("uid", token, {
  //   domain: "www.google.com"
  // });
  return res.json({ token });
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
