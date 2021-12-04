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
  keywords: {
    type: [String],
    require: true,
    // validate: {
    //   validator: (v) => {
    //     return v.length <= 5;
    //   },
    //   message: (props) => `keywords must contain less than or equal to 5 items`,
    // },
  },
  picture: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  keywords: {
    type: [String],
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  website: {
    type: String,
  },
});

const validateCard = (card) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().required(),
    region: Joi.string().min(3).max(50).required(),
    categories: Joi.array().items(Joi.string().required()).required().min(1),
    user: Joi.string().min(5).max(255).required(),
    keywords: Joi.array()
      .items(Joi.string().required())
      .max(5)
      .min(1)
      .required(),
    website: Joi.string(),
  };
  return Joi.validate(card, schema);
};

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card, validateCard };
