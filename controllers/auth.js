const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ error: "That email is already in use" });
    }
    user = await User.findOne({ username: username });
    if (user) {
      return res.status(400).json({ error: "That username is taken." });
    }
    let newUser = await User.create({ username, name, email, password });
    res
      .status(201)
      .json({
        message: `Sign up was successful, please log in to continue`,
        newUser,
      });
  } catch (error) {
    console.log(error);
  }
};

const logIn = async (req, res) => {
  try {
    const { username: logInUsername, password } = req.body;
    const user = await User.findOne({ username: logInUsername });
    if (!user || !user.authenticate(password)) {
      return res
        .status(400)
        .json({ error: "User name and password do not match." });
    }
    const token = jwt.sign(
      { _id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username } = user;
    res.status(201).json({ token, user: { _id, username } });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const logOut = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout success" });
};

module.exports = {
  signUp,
  logIn,
  logOut,
};
