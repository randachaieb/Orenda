const mongoose = require("mongoose");
const Joi = require("joi");

const post_groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
 
  posts: {
    type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      }],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const validateGroup = (group) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    posts: Joi.array().items(Joi.string().min(5).max(255).required()),
    user: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(group, schema);
};

const Post_group = mongoose.model("Post_group", post_groupSchema);

module.exports = { Post_group, validateGroup };
