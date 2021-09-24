const mongoose = require("mongoose");
const Joi = require("joi");

const PlacesCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  views: {
    type: Number,
    default: 0,
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
    subCategory: Joi.array().items(Joi.string().required()),
  };
  return Joi.validate(place, schema);
};

const PlacesCategory = mongoose.model("PlacesCategory", PlacesCategorySchema);

module.exports = { PlacesCategory, validatePlace };
