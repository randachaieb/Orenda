const multer = require("multer")

const PATH="./server/uploads/card_images";

const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith('image')) {
     cb(null, true);
   } else {
     cb(null, false);

   }
 };

let storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,PATH);
    },
    filename: function(req, file, cb){
       cb(null,file.originalname.toLowerCase().replace(/ /g, '_'));
    }
 });

 let uploadCardImage = multer({
    storage: storage,
    fileFilter: multerFilter

 })

 module.exports=uploadCardImage