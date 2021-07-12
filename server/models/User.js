const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  bio: {
    type: String,
    // required: true,
  },
  region: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 50,
  },
  address: {
    type: String,
    // required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  picture: {
    type: String,
    default: "/static/user_profile/picture/default.jpg",
    minlength: 5,
    maxlength: 1024,
  },
  cover: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  slides: {
    type: [String]
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isPro: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(255).required(),
 
  };

  return Joi.validate(user, schema);
};

module.exports = { User, validate: validateUser };
