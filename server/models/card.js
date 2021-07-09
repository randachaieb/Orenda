const mongoose = require("mongoose");
const Joi = require("joi");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
  },
  region: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  // for places, scholorship, hackathon..
  categories: {
    type: [String],
    required: true,
  },
  picture: {
    type: String,
    // required: true,
    default: "/static/card_images/default.jpg",
    minlength: 5,
    maxlength: 1024,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const validateCard = (card) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(50).required(),
    region: Joi.string().min(3).max(50).required(),
    categories: Joi.array().items(Joi.string().required()),
    user: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(card, schema);
};

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card, validateCard };
