const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { join, basename } = require("path");
const { Post, validatePost } = require("../../models/post");

const _ = require("lodash");
const auth = require("../../middleware/auth");
const debug = require("debug")("app:routes");

const {
  uploadPost,
  fileUploadPaths,
} = require("../../middleware/uploadHandler");

const {
  moveFile,
  deleteFile,
  fileType,
} = require("../../utilities/fileManager");

// @route   GET api/v1/post
// @desc    Get user post
// @access  private
router.get("/", auth, async (req, res) => {
  const { _id } = req.user;
  const all_posts = await Post.find({
    user_id: _id,
    deleted: "false",
  }).populate("User");
  res.json(all_posts);
});

// @route   POST api/v1/post
// @desc    Add post
// @access  private
router.post("/", auth, uploadPost.single("link"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  let newPost = {
    ...req.body,
    user_id: req.user._id,
    type: "text",
  };
  const { error } = validatePost(newPost);
  if (error) {
    if (req.file)
      deleteFile(join(fileUploadPaths.FILE_UPLOAD_PATH, req.file.filename));
    return res.status(400).json(error.details[0].message);
  }

  if (req.file) {
    const fileName = req.file.filename;
    const post_type = fileType(req.file);
    newPost = {
      ...newPost,
      type: post_type,
      link: `${fileUploadPaths.POST_FILE_URL}/${fileName}`,
    };
  }
  moveFile(
    join(fileUploadPaths.FILE_UPLOAD_PATH, fileName),
    join(fileUploadPaths.POST_FILE_UPLOAD_PATH, fileName)
  );

  const savedPost = await new Post(newPost).save();

  return res.json({ post: savedPost });
});

// @route   PATCH api/v1/post
// @desc    update post
// @access  private
router.patch(
  "/update/:id",
  auth,
  uploadPost.single("link"),
  async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (post.deleted) return res.json({ message: "post not found" });

    let update_values = { ...req.body };
    const { error } = validate_update(update_values);
    if (error) {
      if (req.file)
        deleteFile(join(fileUploadPaths.FILE_UPLOAD_PATH, req.file.filename));
      return res.status(400).json(error.details[0].message);
    }

    if (req.file) {
      let post_filename = basename(post.link);
      let post_type = fileType(req.file);
      const updated_filename = req.file.filename;
      if (updated_filename !== post_filename)
        deleteFile(join(fileUploadPaths.POST_FILE_UPLOAD_PATH, post_filename));
      let path = `${fileUploadPaths.POST_FILE_URL}/${updated_filename}`;
      update_values = { ...update_values, type: post_type, link: path };
      moveFile(
        join(fileUploadPaths.FILE_UPLOAD_PATH, updated_filename),
        join(fileUploadPaths.POST_FILE_UPLOAD_PATH, updated_filename)
      );
    }
    debug(update_values);
    const updatedPost = await Post.findByIdAndUpdate(id, update_values);
    res.json({ message: "post updated", success: true });
  }
);

// @route   DELETE api/v1/post
// @desc    delete a single post
// @access  private
router.delete("/delete", auth, async (req, res) => {
  const { id } = req.body;
  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "post not found" });
  else {
    const newPost = await Post.findByIdAndUpdate(id, { deleted: true });
    res.json({
      message: "post deleted",
    });
  }
});

// @route   GET api/v1/post
// @desc    Get post by id
// @access  public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.status(400).json({ message: "post not found" });
  else {
    if (post.deleted)
      return res.status(400).json({ message: "post not found" });
    res.json({ post });
  }
});

const validate_update = (req) => {
  const schema = {
    text: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
