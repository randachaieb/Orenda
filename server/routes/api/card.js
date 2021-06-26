const express = require("express");
const Joi = require("joi");
const path = require("path");
const router = express.Router();
const { Card, validateCard } = require("../../models/card");

const _ = require("lodash");
const auth = require("../../middleware/auth");
const debug = require("debug")("app:routes");

const {uploadCardImage,PATH}=require('../../middleware/uploadCardImage')
const fs =require('fs')



// @route   GET api/v1/card
// @desc    Get user card
// @access  private
router.get("/", auth, async (req, res) => {
  const { _id } = req.user;
  const all_cards = await Card.find({ user: _id }).populate("User");
  res.json(all_cards);
});


// @route   POST api/v1/card
// @desc    Add card
// @access  private
router.post("/",auth, uploadCardImage.single('picture') , async (req, res) => {
  if (!req.file ) { 
    return res.status(400).json({ message: "No image uploaded" });
  }else{
    const { error } = validateCard({ ...req.body, user: req.user._id });
    if (error) return res.status(400).json(error.details[0].message);

    const image=req.file.filename
    const newCard = new Card({
      ...req.body,
      picture:`/static/card_images/${image}`,
      user: req.user._id,
    });
    const savedCard = await newCard.save();
    return res.json({ card: savedCard });
  
  }



 
});

// @route   PATCH api/v1/card
// @desc    update card
// @access  private
router.patch("/update/:id", auth,uploadCardImage.single('picture'), async (req, res) => {
  const { id } = req.params;
  var update_values=req.body; 

  
  if(req.file)  {   
    const card = await Card.findById(id); 
    var path=card.picture;  //current image
    let image =path.split('/');
    let image_filename=image[image.length-1] ;                          
    if(req.file.filename!==image_filename) { //update a different image
      fs.unlink(PATH+'/'+image_filename, function(error) {  //delete old one
        debug(error);
      });
    }
    path= `/static/card_images/${req.file.filename}`  //set the path of the new image
    update_values={...update_values,picture:path}
  }
  const { error } = validate_update(req.body);
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



// @route   DELETE api/v1/card
// @desc    delete a single card
// @access  private
router.delete("/card_delete", auth, async (req, res) => {
  const { id } = req.body;
  const card= await Card.findByIdAndDelete(id);

  if(card===null) return res.status(400).json({ message: "card not exists" });
  else{
let path =card.picture.split('/')

    fs.unlink(PATH+'/'+path[path.length-1], function() {

      res.json ({
      message:"card deleted"
      });
    });
  }
});



// @route   GET api/v1/card
// @desc    Get card by id
// @access  public
router.get("/:id", async(req, res) => {
  const { id } = req.params;
  const card = await Card.findById(id); //.populate("user");
  res.json({ card });



});




const validate_update = (req) => {
  const schema = {
    name: Joi.string().min(5).max(50),
    description: Joi.string().min(50),
    region: Joi.string().min(3).max(50),
    categories: Joi.array().items(Joi.string().required()),
    //opportunities: Joi.array().items(Joi.string().required()),
  };
  return Joi.validate(req, schema);
};



module.exports = router;
