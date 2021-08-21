const express = require("express");
const router = express.Router();

const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const {
  PlacesCategory,
  validatePlace,
} = require("../../models/PlacesCategory");
const { User } = require("../../models/User");
const { Domain, validateDomain } = require("../../models/Domain");
const {
  OffersCategory,
  validateOffer,
} = require("../../models/OffersCategory");

// @route   POST api/v1/categories
// @desc    create a place Category
// @access  Admin
router.post("/placeCategory", admin, async (req, res) => {
  const { error } = validatePlace(req.body);
  if (error) return res.json(error.details[0].message);
  let newOfferCategory = new PlacesCategory({ ...req.body });
  newOfferCategory = await newOfferCategory.save();
  if (!newOfferCategory) throw Error("Could not create place category");
  return res.json(newOfferCategory);
});

// @route   POST api/v1/categories
// @desc    add a sub category
// @access  Admin
router.post("/places/:category_id/subCategory", admin, async (req, res) => {
  const { category_id } = req.params;
  const { error } = validateDomain(req.body);
  if (error) return res.json(error.details[0].message);
  let OfferCategory = await PlacesCategory.findById(category_id);
  if (!OfferCategory)
    return res.status(400).json({ message: "no such place category" });
  let newSubcategory = undefined;
  if (req.body.name) {
    newSubcategory = new Domain({ name: req.body.name });
    newSubcategory = await newSubcategory.save();
  } else if (req.body._id) {
    newSubcategory = await Domain.findById(req.body._id);
  }
  if (!newSubcategory) return res.json({ message: "no such Sub category" });
  OfferCategory.subCategory.push(newSubcategory._id);
  OfferCategory = await OfferCategory.save();
  return res.json(OfferCategory);
});

// @route   GET api/v1/categories
// @desc    Get all places category
// @access  public
router.get("/PlaceCategories", async (req, res) => {
  const placesCategory = await PlacesCategory.find().populate("subCategory");
  if (placesCategory.length === 0)
    return res.status(404).json({ message: "no such category" });

  res.json(placesCategory);
});
// @route   GET api/v1/categories
// @desc    Get all places category
// @access  public
router.get("/PlaceCategories/:_id", async (req, res) => {
  const { _id } = req.params;
  const placesCategory = await PlacesCategory.findById(_id).populate(
    "subCategory"
  );
  if (!placesCategory)
    return res.status(404).json({ message: "no such category" });
  res.json(placesCategory);
});

/*-----------------------------------------*/
// @route   POST api/v1/categories
// @desc    create a offer Category
// @access  Admin
router.post("/OfferCategory", admin, async (req, res) => {
  const { error } = validateOffer(req.body);
  if (error) return res.json(error.details[0].message);
  let newOfferCategory = new OffersCategory({ ...req.body });
  newOfferCategory = await newOfferCategory.save();
  if (!newOfferCategory) throw Error("Could not create offer category");
  return res.json(newOfferCategory);
});

// @route   POST api/v1/categories
// @desc    add a sub category
// @access  Admin
router.post("/offers/:category_id/subCategory", admin, async (req, res) => {
  const { category_id } = req.params;
  const { error } = validateDomain(req.body);
  if (error) return res.json(error.details[0].message);
  let OfferCategory = await OffersCategory.findById(category_id);
  if (!OfferCategory)
    return res.status(400).json({ message: "no such offer category" });
  let newSubcategory = undefined;
  if (req.body.name) {
    newSubcategory = new Domain({ name: req.body.name });
    newSubcategory = await newSubcategory.save();
  } else if (req.body._id) {
    newSubcategory = await Domain.findById(req.body._id);
  }
  if (!newSubcategory) return res.json({ message: "no such Sub category" });
  OfferCategory.subCategory.push(newSubcategory._id);
  OfferCategory = await OfferCategory.save();
  return res.json(OfferCategory);
});

// @route   GET api/v1/categories
// @desc    Get all offers category
// @access  public
router.get("/offerCategories", async (req, res) => {
  const offerCategories = await OffersCategory.find().populate("subCategory");
  if (offerCategories.length === 0)
    return res.status(404).json({ message: "no such category" });

  res.json(offerCategories);
});
// @route   GET api/v1/categories
// @desc    Get all offers category
// @access  public
router.get("/offerCategories/:_id", async (req, res) => {
  const { _id } = req.params;
  const offerCategories = await OffersCategory.findById(_id).populate(
    "subCategory"
  );
  if (!offerCategories)
    return res.status(404).json({ message: "no such category" });

  res.json(offerCategories);
});

// router.get("/", auth, async (req, res) => {
//   let user = await User.findById(req.user._id);
//   user.isAdmin = true;
//   user = await user.save();
//   res.json(user);
// });
module.exports = router;
