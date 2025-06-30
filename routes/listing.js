const express=require('express');
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema,reviewSchema} = require("../schema.js");//for server side validation
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const ListingController=require("../controllers/listings.js");
const multer  = require('multer')

const {storage}=require("../cloudConfig.js");

const upload = multer({storage});




router.route("/")
.get( wrapAsync(ListingController.index))//index route
// .post(isLoggedIn,validateListing, wrapAsync(ListingController.createListing))//create route
.post(upload.single('image'), (req, res) => {
  console.log('✅ Upload reached!');
  console.log(req.file); // log to terminal too
  res.send(req.file); 
});

//create new listing route
router.get("/new",isLoggedIn,ListingController.renderNewForm);

router.route("/:id")
.get( wrapAsync(ListingController.showListing))//show route
.put(isLoggedIn,isOwner,validateListing, wrapAsync(ListingController.updateListing))//update route
.delete(isLoggedIn,isOwner, wrapAsync(ListingController.destroyListing))//delete route




//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingController.renderEditForm));

// Debug route to test POST requests
router.post("/test", (req, res) => {
    console.log("✅ /test route reached");
    res.send("Test route hit!");
});

module.exports=router;