const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  place: {
    type: String,
  },
  offer: {
    type: [String],
  },
  profile: {
    type: String,
  },
  website: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  website: {
    type: String,
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});

const validateCard = (card) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().required(),
    region: Joi.string().min(3).max(50).required(),
    place: Joi.string().allow(null),
    offer: Joi.array().items(Joi.string().allow(null)),
    profile: Joi.string().allow(null),
    website: Joi.string().allow(null),
    facebook: Joi.string().allow(null),
    instagram: Joi.string().allow(null),
    linkedin: Joi.string().allow(null),

    user: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(card, schema);
};

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card, validateCard };