const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
type: {
    type: String,
    required: true,
    enum: ['text', 'image', 'video'] 
  },
  text: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  link: {
    type: String,
     required: false,
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
    type: Joi.string().required(),
    text: Joi.string().min(5).max(50).required(),   
    user_id: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(post, schema);
};

const Post = mongoose.model("Post", postSchema);

module.exports = { Post, validatePost };
