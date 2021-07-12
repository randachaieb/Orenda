const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { join, basename } = require("path");
const { Card, validateCard } = require("../../models/card");

<<<<<<< HEAD
const { moveFile, deleteFile } = require("../../utilities/fileManager");
=======
const { moveFile, deleteFile} = require("../../utilities/fileManager");
>>>>>>> 17dc11343de14328c0db226180a8e7075b3bd2de
const _ = require("lodash");
const auth = require("../../middleware/auth");
const debug = require("debug")("app:routes");

const {
  uploadImage,
  fileUploadPaths,
} = require("../../middleware/uploadHandler");

<<<<<<< HEAD
const getCardsPages = async (query = {}, page = 0, perPage = 20) => {
  return await Card.find(query)
    .populate({ path: "user", select: "name picture username" })
    .limit(perPage)
    .skip(perPage * page);
};
=======
>>>>>>> 17dc11343de14328c0db226180a8e7075b3bd2de

// @route   GET api/v1/card
// @desc    Get user card
// @access  private
router.get("/", auth, async (req, res) => {
  const { _id } = req.user;
  const page = req.query.page || 0;
  const all_cards = await getCardsPages({ user: _id }, page);
  res.json(all_cards);
});

// @route   POST api/v1/card
// @desc    Add card
// @access  private
<<<<<<< HEAD
router.post("/", auth, uploadCardImage.single("picture"), async (req, res) => {
=======
router.post("/", auth, uploadImage.single("picture"), async (req, res) => {
  console.log(req.file);
  console.log(req.body);

>>>>>>> 17dc11343de14328c0db226180a8e7075b3bd2de
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" });
  } else {
    const { error } = validateCard({ ...req.body, user: req.user._id });
    if (error) {
<<<<<<< HEAD
      deleteFile(join(fileUploadPaths.FILE_UPLOAD_PATH, req.file.filename));
=======
      deleteFile(join(fileUploadPaths.FILE_UPLOAD_PATH,req.file.filename));
>>>>>>> 17dc11343de14328c0db226180a8e7075b3bd2de
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
// @desc    delete a card
// @access  private
router.delete("/delete", auth, async (req, res) => {
  const { card_list } = req.body;
  const l = await Card.deleteMany({
    _id: { $in: card_list },
    user: req.user._id,
  });
  debug(l);
  if (l.deletedCount === 0) return res.json({ success: false });
  return res.json({ message: "card deleted", success: true });
});

// @route   DELETE api/v1/card
// @desc    delete a single card
// @access  private
router.delete("/card_delete", auth, async (req, res) => {
  const { id } = req.body;
  const card = await Card.findOne({ id, user: req.user._id });
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
// @access  private
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
  const card = await Card.findById(id).populate({
    path: "user",
    select: "name picture username",
  });
  res.json({ card });
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
    description: Joi.string().min(50),
    region: Joi.string().min(3).max(50),
    categories: Joi.array().items(Joi.string().required()),
    keywords: Joi.array().items(Joi.string().required()),
    website: Joi.string(),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
