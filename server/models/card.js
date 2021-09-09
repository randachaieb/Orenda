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
  PlaceCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PlacesCategory",
  },
  OfferCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OffersCategory",
  },
  domain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Domain",
  },
  // keywords: {
  //   type: [String],
  //   require: true,
  // },
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
  website: {
    type: String,
  },
});

const validateCard = (card) => {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(50).required(),
    region: Joi.string().min(3).max(50).required(),
    PlaceCategory: Joi.string().min(5).max(255),
    OfferCategory: Joi.string().min(5).max(255),
    domain: Joi.string().min(5).max(255).required(),
    user: Joi.string().min(5).max(255).required(),
    // keywords: Joi.array()
    //   .items(Joi.string().required())
    //   .max(5)
    //   .min(1)
    //   .required(),
    website: Joi.string(),
  };
  return Joi.validate(card, schema);
};

const Card = mongoose.model("Card", cardSchema);

module.exports = { Card, validateCard };
