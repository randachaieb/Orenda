const express = require("express");
const { User, validate } = require("../../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const auth = require("../../middleware/auth");
const router = express.Router();
const debug = require("debug")("app:routes");

// @route   GET api/v1/user/me
// @desc    user info
// @access  private

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  debug(req.user);
  res.json(user);
});

// @route   POST api/v1/user
// @desc    register user
// @access  Public
router.post("/", async (req, res) => {
  debug(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password } = req.body;

  // Check if email is uesed
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exist" });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  debug({
    ...req.body,
    password: hash,
  });

  user = new User({
    ...req.body,
    password: hash,
  });

  user = await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .json(_.pick(user, ["_id", "name", "email", "bio"]));
});

module.exports = router;
