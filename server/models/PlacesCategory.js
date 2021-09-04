const mongoose = require("mongoose");
const Joi = require("joi");
const { intersectionBy, toInteger } = require("lodash");

const PlacesCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },  
  count: {
    type: Number
  },
  subCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Domain",
    },
  ],
});

const validatePlace = (place) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    count: Joi.required(),
    subCategory: Joi.array().items(Joi.string().required()),
  };
  return Joi.validate(place, schema);
};

const PlacesCategory = mongoose.model("PlacesCategory", PlacesCategorySchema);

module.exports = { PlacesCategory, validatePlace };
