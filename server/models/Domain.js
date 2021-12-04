const mongoose = require("mongoose");
const Joi = require("joi");

const DomainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const validateDomain = (domain) => {
  const schema = Joi.alternatives().try(
    {
      name: Joi.string().min(3).max(50).required(),
    },
    {
      _id: Joi.string().min(3).max(50).required(),
      name: Joi.string().min(3).max(50),
    }
  );
  return Joi.validate(domain, schema);
};

const Domain = mongoose.model("Domain", DomainSchema);

module.exports = { Domain, validateDomain };
