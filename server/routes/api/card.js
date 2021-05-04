const express = require("express");
const Joi = require("joi");
const path = require("path");
const router = express.Router();
const { Card, validateCard } = require("../../models/card");

const _ = require("lodash");
const auth = require("../../middleware/auth");
const debug = require("debug")("app:routes");

// @route   GET api/v1/card
// @desc    Get user card
// @access  private
router.get("/", auth, async (req, res) => {
  const { _id } = req.user;
  const all_cards = await Card.find({ user: _id }).populate("User");
  res.json(all_cards);
});

// @route   POST api/v1/card
// @desc    Add card's image
// @access  private
router.post("/image/:card_id", auth, async (req, res) => {
  const { card_id } = req.params;
  const newCard = await Card.findOne({ _id: card_id, user: req.user._id });
  debug(newCard);
  if (!newCard) return res.status(400).json({ message: "no such card!" });
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // picture upload
  const file = req.files.picture;
  const regex = /^image\/(png|jpg|jpeg)$/;
  if (!regex.test(file.mimetype))
    return res
      .status(400)
      .json({ message: "File type should be png, jpg, or jpeg" });
  // save image in a folder
  const err = await file.mv(
    path.join(__dirname, "..", "..", "public", "card_images", file.name)
  );
  if (err) throw err;
  newCard.picture = `/static/card_images/${file.name}`;
  debug(newCard);

  const savedCard = await newCard.save();
  return res.json({ card: savedCard });
});

// @route   POST api/v1/card
// @desc    Add card
// @access  private
router.post("/", auth, async (req, res) => {
  const { error } = validateCard({ ...req.body, user: req.user._id });
  if (error) return res.status(400).json(error.details[0].message);
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const newCard = new Card({
    ...req.body,
    user: req.user._id,
  });
  const savedCard = await newCard.save();
  return res.json({ card: savedCard });
});

// @route   PATCH api/v1/card
// @desc    update card
// @access  private
router.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  const update_values = req.body;
  const { error } = validate_update(update_values);
  if (error) return res.status(400).json(error.details[0].message);
  debug(update_values);
  const newCard = await Card.findByIdAndUpdate(id, update_values);
  res.json({ message: "card updated", success: true });
});

// @route   DELETE api/v1/card
// @desc    delete a card
// @access  private
router.delete("/delete", auth, async (req, res) => {
  const { card_list } = req.body;
  const l = await Card.deleteMany({ _id: { $in: card_list } });
  debug(l);
  if (l.deletedCount === 0) return res.json({ success: false });
  return res.json({ message: "card deleted", success: true });
});

// @route   GET api/v1/card
// @desc    Get card by id
// @access  public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id).populate("User");
  res.json({ card });
});

const validate_update = (req) => {
  const schema = {
    name: Joi.string().min(5).max(50),
    description: Joi.string().min(50),
    region: Joi.string().min(3).max(50),
    categories: Joi.array().items(Joi.string().required()),
    opportunities: Joi.array().items(Joi.string().required()),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
