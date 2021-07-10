const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Post_group, validateGroup } = require("../../models/post_group");
const { Post } = require("../../models/post");

const _ = require("lodash");
const auth = require("../../middleware/auth");
const { json } = require("express");
const debug = require("debug")("app:routes");





// @route   GET api/v1/group_post
// @desc    Get user group
// @access  private
router.get("/", auth, async (req, res) => {
  const { _id } = req.user;
  const all_groups = await Post_group.find({ user: _id })
                                      .populate({ path:'posts',
                                                  match: {
                                                  deleted: false,
                                                  }
                                                });
  res.json(all_groups);
});

// @route   POST api/v1/post_group
// @desc    Add group
// @access  private
router.post("/", auth, async (req, res) => {
    const newGroup={...req.body,user:req.user._id}
    const { error } = validateGroup(newGroup);
  if (error) return res.status(400).json(error.details[0].message);
  const savedGroup = await new Post_group(newGroup).save();

  return res.json({ group: savedGroup });

});

// @route   POST api/v1/post_group
// @desc    Add posts to a group
// @access  private
router.patch("/addPosts/:id", auth, async (req, res) => {
  const { id } = req.params;
  const new_posts=req.body.posts;
  const group_posts = await Post_group.findById(id);


  const group = await Post_group.findOneAndUpdate(
    { _id: id }, 
    { $addToSet: { posts: { $each: new_posts } }},  
);
if(!group) return res.json({ message:"group not found"});
return res.json({ message:"group updated"});

});

// @route   POST api/v1/post_group
// @desc    Add single post to a group
// @access  private
router.patch("/addPost/:id", auth, async (req, res) => {
  const { id } = req.params;
  const new_post=req.body.post;
  const group_posts = await Post_group.findById(id);
  let isExist = group_posts.posts.includes(new_post) ;
  if(isExist) return res.json({ message:"post is already exists in the group"});

  const group = await Post_group.findOneAndUpdate(
    { _id: id }, 
    { $push: { posts: new_post }},  
);
if(!group) return res.json({ message:"group not found"});
return res.json({ message:"group updated"});

});


// @route   POST api/v1/post_group
// @desc    delete posts from a group
// @access  private
router.patch("/removePosts/:id", auth, async (req, res) => {
  const { id } = req.params;
  const new_posts=req.body.posts;

  const group = await Post_group.findOneAndUpdate(
    { _id: id }, 
    { $pull: { posts: { $in: new_posts } }},  
);
if(!group) return res.json({ message:"group not found"});
return res.json({ message:"group updated"});

});



// @route   DELETE api/v1/post_group
// @desc    delete a group
// @access  private
router.delete("/delete", auth, async (req, res) => {
  const { id } = req.body;
  const group = await Post_group.findById(id);

  if (!group)
    return res.status(400).json({ message: "group not found" });
  else {
  
    const newGroup = await Post_group.findByIdAndDelete(id);

    res.json({
      message: "group deleted",
    });
  }
});

// @route   GET api/v1/group_post
// @desc    Get a group  
// @access  public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const group = await Post_group.findById(id)
                                .populate( 
                                { path:'posts',
                                  match: {
                                  deleted: false,
                                  }
                                }); 
  if (!group)
  return res.status(400).json({ message: "no group found" });
  res.json({ group });

});



module.exports = router;
