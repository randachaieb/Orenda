const express = require("express");
const { User, validate } = require("../../models/User");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const auth = require("../../middleware/auth");
const router = express.Router();
const debug = require("debug")("app:routes");
const Joi = require("joi");
const { join, basename } = require("path");
const { moveFile, deleteFile } = require("../../utilities/fileManager");

const {
  uploadImage,
  fileUploadPaths,
} = require("../../middleware/uploadHandler");
const { Types } = require("mongoose");
const { _invalids } = require("joi/lib/types/lazy");

// @route   GET api/v1/user/me
// @desc    user info
// @access  private
router.get("/me", auth, async (req, res) => {
  const users = await User.aggregate([
    { $match: { _id: Types.ObjectId(req.user._id) } },
    {
      $project: {
        name: 1,
        picture: 1,
        email: 1,
        username: 1,
        bio: 1,
        region: 1,
        address: 1,
        followers: {
          $size: {
            $cond: [{ $isArray: "$followers" }, "$followers", []],
          },
        },
        following: {
          $size: {
            $cond: [{ $isArray: "$following" }, "$following", []],
          },
        },
      },
    },
  ]);

  if (!users[0]) return res.status(404).json({ message: "no user found" });

  res.json(
    _.pick(users[0], [
      "_id",
      "name",
      "username",
      "email",
      "bio",
      "region",
      "address",
      "picture",
      "followers",
      "following",
    ])
  );
});

// @route   POST api/v1/user
// @desc    register user
// @access  Public
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // Check if email is uesed
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: "User already exist" });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  user = new User({
    ...req.body,
    password: hash,
    username: req.body.name
      .split(" ")
      .concat(Math.floor(Math.random() * 100))
      .join("."),
  });

  user = await user.save();

  const token = user.generateAuthToken();
  // .header("x-auth-token", token)
  res.status(200).json({
    token,
    user: _.pick(user, [
      "_id",
      "name",
      "username",
      "email",
      "bio",
      "region",
      "address",
      "picture",
    ]),
  });
});

// @route   GET api/v1/card
// @desc    Search for cards
// @access  public
router.get("/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "no query" });

  const searchResualt = await User.find({
    name: { $regex: `(?:${q.split(" ").join("|")})`, $options: "i" },
  });

  res.status(200).json(searchResualt);
});

// @route   GET api/v1/user/update
// @desc    update profile
// @access  private
router.patch(
  "/update",
  auth,
  uploadImage.single("picture"),
  async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user._id);
    let update_values = req.body;
    if (req.file) {
      let image_filename = basename(user.picture);
      const imageName = req.file.filename;
      if (imageName !== image_filename && image_filename !== "default.jpg")
        deleteFile(
          join(fileUploadPaths.USER_IMAGE_UPLOAD_PATH, image_filename)
        );

      //set the path of the new image
      path = `${fileUploadPaths.USER_IMAGE_URL}/${imageName}`;
      update_values = { ...update_values, picture: path };
      moveFile(
        join(fileUploadPaths.FILE_UPLOAD_PATH, imageName),
        join(fileUploadPaths.USER_IMAGE_UPLOAD_PATH, imageName)
      );
    }
    debug(update_values);

    const newUser = await User.findByIdAndUpdate(
      req.user._id,
      update_values
    ).select("-password");
    debug(newUser);
    res.json({
      message: "user updated",
      success: true,
    });
  }
);

// @route   GET api/v1/user
// @desc   follow a user
// @access  private
router.post("/follow", auth, async (req, res) => {
  const { user } = req;
  const { _id } = req.body;
  const loggedUser = await User.findById(user._id);
  if (!loggedUser.following.includes(_id) && _id !== user._id) {
    loggedUser.following.push(_id);
    await loggedUser.save();
    await User.updateOne({ _id }, { $push: { followers: user._id } });
    return res.status(201).end();
  } else
    return res
      .status(400)
      .json({ message: "You are already following this user" });
});

// @route   GET api/v1/user
// @desc   unfollow a user
// @access  private
router.post("/unfollow", auth, async (req, res) => {
  const { user } = req;
  const { _id } = req.body;

  const followingsRemoved = await User.updateOne(
    { _id: user._id },
    { $pull: { following: _id } }
  );
  if (followingsRemoved === 0)
    return res.status(400).json({
      message: "This user isn't in your followers",
    });
  await User.updateOne({ _id }, { $pull: { followers: user._id } });
  return res.status(200).end();
});

// @route   GET api/v1/user
// @desc    get user profile by id
// @access  private
router.get("/profile/:_id", async (req, res) => {
  const { _id } = req.params;

  const users = await User.aggregate([
    { $match: { _id: Types.ObjectId(_id) } },
    {
      $project: {
        name: 1,
        picture: 1,
        email: 1,
        username: 1,
        bio: 1,
        region: 1,
        address: 1,
        followers: {
          $size: {
            $cond: [{ $isArray: "$followers" }, "$followers", []],
          },
        },
        following: {
          $size: {
            $cond: [{ $isArray: "$following" }, "$following", []],
          },
        },
      },
    },
  ]);

  if (!users[0]) return res.status(404).json({ message: "no user found" });

  return res.json(users[0]);
});
const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50),
    bio: Joi.string().min(5),
    region: Joi.string().min(5).max(50),
    address: Joi.string().min(5).max(50),
    email: Joi.string().min(5).max(50).email(),
    // isAdmin: Joi.boolean(),
    // isPro: Joi.boolean(),
  };
  return Joi.validate(user, schema);
};
module.exports = router;
