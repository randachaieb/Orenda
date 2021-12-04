const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'video'] 
  },
  text: {
    type: String,
  },
  link: {
    type: String,
  },  
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  deleted: {
    type: Boolean,
    default: false,
  },
  published: {
    type: Boolean,
    default: true,
  },

  Date_creation: {
     type: Date, 
     default: Date.now },


}
);

const validatePost = (post) => {
  const schema = {
    type: Joi.string(),
    text: Joi.string().allow('').allow(null),   
    user_id: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(post, schema);
};

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, validatePost };
