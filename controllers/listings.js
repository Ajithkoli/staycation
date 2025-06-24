const Listing=require("../models/listing.js");
//showing all the listing
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}

//create a new listing form
module.exports.renderNewForm= (req, res) => {
      res.render("listings/new.ejs");
}


module.exports.showListing=async (req, res) => {
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
}


//post route for creating a new listing
module.exports.createListing=async (req, res) => {
    
    const newListing = new Listing(req.body);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");

}
//rendering a edit form
module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
     if (!listing) {
       req.flash("error","Listing You Requested for does not exist");
       res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/edit.ejs", { listing });
}

//updating a listing
module.exports.updateListing=async (req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    req.flash("success","listing updated");
    res.redirect("/listings");
}

//delete listing
module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","listing deleted");
    res.redirect("/listings");
}
