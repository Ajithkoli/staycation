const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const ListingSchema = require("./schema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("connected to DB");
})
    .catch((err) => {
        console.log(err);
    });
async function main() {
    await mongoose.connect(MONGO_URL);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("working");
})

// app.get("/testListing",async (req,res)=>{
//    let sampleListing=new Listing({
//     title:"My new Villa",
//     description:"By the beach",
//     price:3000,
//     location:"Goa",
//     country:"India",
//    })

//    await sampleListing.save().then(()=>{
//     console.log("sample was saved");
//     res.send("successful testing");
//    })

// })

//middleware to throw error for joi schema validation
const validateListing = (req, res, next) => {
    let { error } = req.body;

    if (error) {
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
}


//index route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });

}))

//create new listing route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });

}));

//create route
app.post("/listings",validateListing, wrapAsync(async (req, res) => {
    
    const newListing = new Listing(req.body);
    await newListing.save();
    res.redirect("/listings");

}));

//edit route
app.get("/listings/:id/edit",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs", { listing });
}));

//update route
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body });
    res.redirect("/listings");
}))

//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

//this code should be enabled to handled routes that arent present

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found"));
// })

//error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err });
})

app.listen(8080, () => {
    console.log("app listening on port 8080");
})

// the footer should not move
