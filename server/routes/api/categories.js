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

// @route   DELETE api/v1/categories
// @desc    delete a single categories
// @access  Admin
router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  const PlacesCategoryy = await PlacesCategory.findByIdAndDelete(id);

  if (PlacesCategoryy === null)
    return res.status(400).json({ message: "PlacesCategory not exists" });
    res.json({
      message: "PlacesCategory deleted",
    });
  
});
// @route   DELETE api/v1/categories
// @desc    delete a single categories offer
// @access  Admin
router.delete("/deleteOffer", async (req, res) => {
  const { id } = req.body;
  const OffersCategoryy = await OffersCategory.findByIdAndDelete(id);

  if (OffersCategoryy === null)
    return res.status(400).json({ message: "OffersCategory not exists" });
    res.json({
      message: "OffersCategory deleted",
    });
  
});

// @route   POST api/v1/categories
// @desc    create a place Category
// @access  Admin
router.post("/placeCategory", async (req, res) => {
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
router.post("/places/:category_id/subCategory", async (req, res) => {
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
router.get("/PlacesCategories", async (req, res) => {
  var mysort = { count: -1 };
  const OfferCategories = await PlacesCategory.find().populate("subCategory").sort(mysort);
  res.json(OfferCategories);
});

/*-----------------------------------------*/
// @route   POST api/v1/categories
// @desc    create a offer Category
// @access  Admin
router.post("/OfferCategory", async (req, res) => {
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
router.post("/offers/:category_id/subCategory", async (req, res) => {
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
// Update place
router.patch('/updatePlace/:id',
  async (req, res) => {
    const { id } = req.params;
    const place = await PlacesCategory.findById(id);
    if (place.deleted) return res.json({ message: "place not found" });

    let update_values = { name:req.body.name};

    const updatedplace = await PlacesCategory.findByIdAndUpdate(id, update_values);
    res.json({ message: "place updated", success: true });
  }
);
// @route   PATCH api/v1/categories
// @desc    udate offer
// @access  Admin
router.patch('/updateOffer/:id',
async (req, res) => {
  const { id } = req.params;
  const offer = await OffersCategory.findById(id);
  if (offer.deleted) return res.json({ message: "offer not found" });

  let update_values = { name:req.body.name};

  const updatedoffer = await OffersCategory.findByIdAndUpdate(id, update_values);
  res.json({ message: "offer updated", success: true });
}
);
// Update place count
router.patch('/update/:id',
  async (req, res) => {
    const { id } = req.params;
    const place = await PlacesCategory.findById(id);
    if (place.deleted) return res.json({ message: "place not found" });

    let update_values = { count:place.count+1};

    const updatedplace = await PlacesCategory.findByIdAndUpdate(id, update_values);
    res.json({ message: "place updated", success: true });
  }
);
//find  place by id 
router.get("/PlacesCategoriesid/:id", async (req, res) => {
  const { id } = req.params;
  const place = await PlacesCategory.findById(id); //.populate("user");
  res.json({ place });
});
//find  place by name 
router.get("/PlacesCategories/:id", async (req, res) => {
  const { id } = req.params;
  const place = await PlacesCategory.find({name:id}); //.populate("user");
  res.json({ place });
});
// Update offer
router.patch('/updateOffer/:id',
  async (req, res) => {
    const { id } = req.params;
    const offer = await OffersCategory.findById(id);
    if (offer.deleted) return res.json({ message: "offer not found" });

    let update_values = { count:offer.count+1};

    const updatedoffer = await OffersCategory.findByIdAndUpdate(id, update_values);
    res.json({ message: "offer updated", success: true });
  }
);
//find  offer by id 
router.get("/offerCategoriesid/:id", async (req, res) => {
  const { id } = req.params;
  const offer = await OffersCategory.findById(id); 
  res.json({ offer });
});
//find  offer by name 
router.get("/offerCategories/:id", async (req, res) => {
  const { id } = req.params;
  const offer = await OffersCategory.find({name:id}); 
  res.json({ offer });
});
// @route   GET api/v1/categories
// @desc    Get all offers category
// @access  public
router.get("/offerCategories", async (req, res) => {
  var mysort = { count: -1 };
  const offerCategories = await OffersCategory.find().populate("subCategory").sort(mysort);
  res.json(offerCategories);
});
// @route   GET api/v1/categories
// @desc    Get all offers category
// @access  public
router.get("/offerCategoriesSub/:_id", async (req, res) => {
  const { _id } = req.params;
  const offerCategories = await OffersCategory.find({name:_id}).populate(
    "subCategory"
  );
  if (!offerCategories)
    return res.status(404).json({ message: "no such category" });

  res.json(offerCategories);
});
// @route   GET api/v1/categories
// @desc    Get all places category
// @access  public
router.get("/PlaceCategoriesSub/:_id", async (req, res) => {
  const { _id } = req.params;
  const placesCategory = await PlacesCategory.find({name:_id}).populate(
    "subCategory"
  );
  if (!placesCategory)
    return res.status(404).json({ message: "no such category" });
  res.json(placesCategory);
});
router.get("/", auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  user.isAdmin = true;
  user = await user.save();
  res.json(user);
});
module.exports = router;
