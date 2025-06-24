const express=require('express');
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema,reviewSchema} = require("../schema.js");//for server side validation
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");




//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}))

//create new listing route
router.get("/new",isLoggedIn, (req, res) => {
      res.render("listings/new.ejs");
})

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({path: "reviews",
          populate:{
               path:"author",        
        }},
    )
    .populate("owner");  //populate means we are getting the information of that
    if (!listing) {
       req.flash("error","Listing You Requested for does not exist");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing }); 
}));

//create route
router.post("/",isLoggedIn,validateListing, wrapAsync(async (req, res) => {
    
    const newListing = new Listing(req.body);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");

}));

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
     if (!listing) {
       req.flash("error","Listing You Requested for does not exist");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/edit.ejs", { listing });
}));

//update route
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async (req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    req.flash("success","listing updated");
    res.redirect("/listings");
}))

//delete route
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}));



module.exports=router;