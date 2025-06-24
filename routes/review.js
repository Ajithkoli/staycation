const express=require('express');
const router=express.Router({mergeParams:true});
const Review=require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");    // if you want to require middleware then use curly braces

const reviewController=require("../controllers/reviews.js")
//reviews
//post route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;