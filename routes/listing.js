const express=require('express');
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema,reviewSchema} = require("../schema.js");//for server side validation
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");

const ListingController=require("../controllers/listings.js");



//index route
router.get("/", wrapAsync(ListingController.index));

//create new listing route
router.get("/new",isLoggedIn,ListingController.renderNewForm);

//show route
router.get("/:id", wrapAsync(ListingController.showListing));

//create route
router.post("/",isLoggedIn,validateListing, wrapAsync(ListingController.createListing));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(ListingController.renderEditForm));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(ListingController.updateListing))

//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(ListingController.destroyListing));



module.exports=router;