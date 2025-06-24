const Listing=require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");

module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){     //the authentication is taken care and this is a passport middleware which checks if the user is logged in by using the 
                                    //session information read this from documentation

        //if user is not logged in then we should save the  path which the user wanted to access
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must me logged in to create listing");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req,res,next)=>{
     let {id}=req.params;
     let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
//middleware to throw error for joi schema validation
module.exports.validateListing = (req, res, next) => {
    let { error } = req.body;

    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//review validation
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

//check if the owner of the reviews is deleting it or any other person is doing it
module.exports.isReviewAuthor=async (req,res,next)=>{
     let {reviewId,id}=req.params;
     let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}