const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { join, basename } = require("path");
const { Card, validateCard } = require("../../models/card");
const { moveFile, deleteFile } = require("../../utilities/fileManager");
const _ = require("lodash");
const auth = require("../../middleware/auth");
const debug = require("debug")("app:routes");

const {
  uploadImage,
  fileUploadPaths,
} = require("../../middleware/uploadHandler");

const getCardsPages = async (query = {}, page = 0, perPage = 20) => {
  return await Card.find(query)
    .populate({ path: "user", select: "name picture username" })
    .limit(perPage)
    .skip(perPage * page);
};

// @route   GET api/v1/card
// @desc    Get user card
// @access  private
router.get("/", auth, async (req, res) => {
  const { _id } = req.user;
  const all_cards = await Card.find({ user: _id }).populate("user");
  res.json(all_cards);
});

// @route   POST api/v1/card
// @desc    Add card
// @access  private
router.post("/", auth, uploadImage.single("picture"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);

  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  } else {
    if (!req.body.place && !req.body.offer)
      return res.status(400).json({ message: "a place/offer is required " });

    const { error } = validateCard({ ...req.body, user: req.user._id });
    if (error) {
      deleteFile(join(fileUploadPaths.FILE_UPLOAD_PATH, req.file.filename));
      return res.status(400).json(error.details[0].message);
    }

    const imageName = req.file.filename;
    const newCard = new Card({
      ...req.body,
      picture: `${fileUploadPaths.CART_IMAGE_URL}/${imageName}`,
      user: req.user._id,
    });
    moveFile(
      join(fileUploadPaths.FILE_UPLOAD_PATH, imageName),
      join(fileUploadPaths.CART_IMAGE_UPLOAD_PATH, imageName)
    );
    const savedCard = await newCard.save();

    return res.json({ card: savedCard });
  }
});

// @route   PATCH api/v1/card
// @desc    update card
// @access  private
router.patch(
  "/update/:id",
  auth,
  uploadImage.single("picture"),
  async (req, res) => {
    const { id } = req.params;
    if (!req.body.place && !req.body.offer)
      return res.status(400).json({ message: "a place/offer is required " });

    const { error } = validate_update(req.body);
    if (error) {
      if (req.file)
        deleteFile(join(fileUploadPaths.FILE_UPLOAD_PATH, req.file.filename));
      return res.status(400).json(error.details[0].message);
    }
    let update_values = req.body;
    const card = await Card.findById(id);
    if (!card) return res.json({ message: "card not found" });
    if (req.file) {
      let image_filename = basename(card.picture);
      const imageName = req.file.filename;
      if (imageName !== image_filename)
        deleteFile(
          join(fileUploadPaths.CART_IMAGE_UPLOAD_PATH, image_filename)
        );
      path = `${fileUploadPaths.CART_IMAGE_URL}/${req.file.filename}`;
      update_values = { ...update_values, picture: path };
      moveFile(
        join(fileUploadPaths.FILE_UPLOAD_PATH, imageName),
        join(fileUploadPaths.CART_IMAGE_UPLOAD_PATH, imageName)
      );
    }

    debug(update_values);
    const newCard = await Card.findByIdAndUpdate(id, update_values);
    res.json({ message: "card updated", success: true });
  }
);

// @route   DELETE api/v1/card
// @desc    delete a single card
// @access  private
router.delete("/delete", auth, async (req, res) => {
  const { id } = req.body;
  const card = await Card.findByIdAndDelete(id);

  if (card === null)
    return res.status(400).json({ message: "card not exists" });
  else {
    deleteFile(
      join(fileUploadPaths.CART_IMAGE_UPLOAD_PATH, basename(card.picture))
    );
    res.json({
      message: "card deleted",
    });
  }
});

// @route   GET api/v1/card
// @desc    Search for cards
// @access  public
router.get("/search", async (req, res) => {
  const { error } = validate_search_schema(req.query);
  if (error) return res.status(400).json(error.details[0].message);
  const { q } = req.query;
  const searchParams = [...q.split(" "), q];
  searchParams.forEach((i, index, arr) => (arr[index] = new RegExp(i)));
  debug(searchParams, new RegExp("[" + [...q.split(" "), q] + "]"));
  const searchResualt = await Card.find({
    $or: [
      { name: new RegExp("[" + [...q.split(" "), q] + "]") },
      { keywords: { $in: searchParams } },
    ],
  });

  res.json(searchResualt);
});

// @route   GET api/v1/card
// @desc    Get user card
// @access  public
router.get("/all", async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const all_cards = await getCardsPages({}, page);
  res.json(all_cards);
});

// @route   GET api/v1/card
// @desc    Get card by id
// @access  public
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id); //.populate("user");
  res.json({ card });
});

// @route   GET api/v1/card
// @desc    Filter cards
// @access  public
router.get("/filter", async (req, res) => {
  var query;
  var filterResult;
  const { place, offer, region } = req.query;

  if (place) query = { ...query, place: place };
  if (offer) query = { ...query, offer: offer };
  if (region) query = { ...query, region: region };
  if (query) filterResult = await Card.find(query);
  else filterResult = await Card.find();

  res.json(filterResult);
});

const validate_search_schema = (query) => {
  const schema = {
    q: Joi.string().max(50).required(),
  };
  return Joi.validate(query, schema);
};

const validate_update = (req) => {
  const schema = {
    name: Joi.string().min(5).max(50),
    description: Joi.string(),
    region: Joi.string().min(3).max(50),
    place: Joi.string().allow(null),
    offer: Joi.array().items(Joi.string().allow(null)),
    profile: Joi.string().allow(null),
    website: Joi.string(),
    keywords: Joi.array().items(Joi.string().required()),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
