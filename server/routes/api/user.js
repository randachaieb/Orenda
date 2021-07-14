const express = require("express");
const { User, validate } = require("../../models/User");
const { Post} = require("../../models/post");
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

// @route   GET api/v1/user/profile
// @desc    user profile
// @access  private
router.get("/profile/:id", auth, async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password")
                          .populate("folowing",["name","picture"])
                          .populate("folowers",["name","picture"]);
  const posts= await Post.find({'user_id':user._id,
                                  deleted:'false'
                              });


  debug(req.user);
  res.json({
    profile:
    _.pick(user, [
      "_id",
      "name",
      "username",
      "email",
      "bio",
      "region",
      "address",
      "picture",
      "cover",
      "folowers",
      "folowing"
    ]),
    posts:posts
  });
});

// @route   GET api/v1/user/me
// @desc    user info
// @access  private
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password")
                          .populate("folowing",["name","picture"])
                          .populate("folowers",["name","picture"]);

  debug(req.user);
  res.json(
    _.pick(user, [
      "_id",
      "name",
      "username",
      "email",
      "bio",
      "region",
      "address",
      "picture",
      "cover",
      "folowers",
      "folowing"
    ])
  );
});


// @route   POST api/v1/user
// @desc    register user
// @access  Public
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // Check if email is used
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
      "cover",
      "folowers",
      "folowing"
    ]),
  });
});

// @route   PATCH api/v1/user/update
// @desc    update profile
// @access  private
router.patch(
  "/update",
  auth,
  async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const updated_user = await User.findByIdAndUpdate(
      req.user._id,
      req.body
    ).select("-password");
    debug(updated_user);
    res.json(
      {
      message: "user updated",
      success: true,
    }
    );
  }
);

// @route   PATCH api/v1/user/updatePicture
// @desc    update profile picture
// @access  private

router.patch(
  "/updatePicture",
  auth,
  uploadImage.single("picture"),
  async (req, res) => {
    
    if (!req.file)  return res.status(400).json({ message: "No image uploaded" });
      const user = await User.findById(req.user._id);
      let image_filename = basename(user.picture);
      const imageName = req.file.filename;
      if (imageName !== image_filename && image_filename !== "default.jpg")
        deleteFile(
          join(fileUploadPaths.USER_IMAGE_UPLOAD_PATH, image_filename)
        );

      //set the path of the new image
      path = `${fileUploadPaths.USER_IMAGE_URL}/${imageName}`;
      const update_values = { picture: path };
      moveFile(
        join(fileUploadPaths.FILE_UPLOAD_PATH, imageName),
        join(fileUploadPaths.USER_IMAGE_UPLOAD_PATH, imageName)
      );
    

    const updated_user = await User.findByIdAndUpdate(
      req.user._id,
      update_values
    ).select("-password");
    debug(updated_user);
    res.json({
      message: "profile picture updated",
      success: true,
    });
  }
);

// @route   PATCH api/v1/user/removePicture
// @desc    remove profile picture
// @access  private

router.patch(
  "/removePicture",
  auth,
  async (req, res) => {
    const user = await User.findById(req.user._id);
    let image_filename = basename(user.picture);
    deleteFile(
      join(fileUploadPaths.USER_IMAGE_UPLOAD_PATH, image_filename)
    );
    const updated_user = await User.findByIdAndUpdate(
      req.user._id,
      {picture:"/static/user_profile/picture/default.jpg"}
    );
    debug(updated_user);
    res.json({
      message: "profile picture removed",
      success: true,
    });
  }
);



// @route   PATCH api/v1/user/addCover
// @desc    add cover picture
// @access  private

router.patch(
  "/addCover",
  auth,
  uploadImage.single("cover"),
  async (req, res) => {
    
      if (!req.file)  return res.status(400).json({ message: "No image uploaded" });
      const imageName = req.file.filename;
      moveFile(
        join(fileUploadPaths.FILE_UPLOAD_PATH, imageName),
        join(fileUploadPaths.COVER_IMAGE_UPLOAD_PATH, imageName)
      );
      const path = `${fileUploadPaths.COVER_IMAGE_URL}/${imageName}`;
      const updated_user = await User.findByIdAndUpdate(
        req.user._id,
        {cover:path}
        );
      debug(updated_user);
      res.json({
        message: "cover picture added",
        success: true,
      });
  }
);

// @route   PATCH api/v1/user/updateCover
// @desc    update cover picture
// @access  private

router.patch(
  "/updateCover",
  auth,
  uploadImage.single("cover"),
  async (req, res) => {
    
    if (!req.file)  return res.status(400).json({ message: "No image uploaded" });
      const user = await User.findById(req.user._id);
      let image_filename = basename(user.cover);
      const imageName = req.file.filename;
      if (imageName !== image_filename)
        deleteFile(
          join(fileUploadPaths.COVER_IMAGE_UPLOAD_PATH, image_filename)
        );

      //set the path of the new image
      path = `${fileUploadPaths.COVER_IMAGE_URL}/${imageName}`;
      moveFile(
        join(fileUploadPaths.FILE_UPLOAD_PATH, imageName),
        join(fileUploadPaths.COVER_IMAGE_UPLOAD_PATH, imageName)
      );
    

    const updated_user = await User.findByIdAndUpdate(
      req.user._id,
      {cover: path }    
      );
    debug(updated_user);
    res.json({
      message: "cover picture updated",
      success: true,
    });
  }
);



// @route   PATCH api/v1/user/removePicture
// @desc    remove cover picture
// @access  private

router.patch(
  "/removeCover",
  auth,
  async (req, res) => {
    const user = await User.findById(req.user._id);
    let image_filename = basename(user.cover);
    deleteFile(
      join(fileUploadPaths.COVER_IMAGE_UPLOAD_PATH, image_filename)
    );
    const updated_User = await User.findByIdAndUpdate(
      req.user._id,
      {$unset:{cover:""}}  
    );
    debug(updated_User);
    res.json({
      message: "cover picture removed",
      success: true,
    });
  }
);

// @route   PATCH api/v1/user/folow
// @desc    folow other user
// @access  private

router.patch(
  "/folow",
  auth,
  async (req, res) => {
  
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { folowing: req.body.id }},  
 
    );
    const updated_User = await User.findByIdAndUpdate(
      req.body.id,
     { $push: { folowers: req.user._id }},  

    );
    res.json({
      message: "folow done successfuly",
      success: true,
    });
  }
);
// @route   PATCH api/v1/user/unfolow
// @desc    unfolow a user
// @access  private

router.patch(
  "/unfolow",
  auth,
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { folowing: req.body.id }},  
   
    );
    const updated_User = await User.findByIdAndUpdate(
      req.body.id,
     { $pull: { folowers: req.user._id }},  

    );
    res.json({
      message: "unfolow done successfuly",
      success: true,
    });
  }
);



const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50),
    bio: Joi.string(),
    region: Joi.string().min(5).max(50),
    address: Joi.string().min(5).max(50),
    email: Joi.string().min(5).max(50).email(),
    // isAdmin: Joi.boolean(),
    // isPro: Joi.boolean(),
  };
  return Joi.validate(user, schema);
};
module.exports = router;