const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

const  MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
  await mongoose.connect(MONGO_URL);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded(extended=true));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
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

//index route
app.get("/listings",async (req,res)=>{
   const allListings=await Listing.find({});
   res.render("listings/index.ejs",{allListings});
 
})

//create new listing route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});

});

//create route
app.post("/listings",async (req,res)=>{
    
   const newListing= new Listing(req.body);
   await newListing.save();
   res.redirect("/listings");
    
})

//edit route
app.get("/listings/:id/edit",async (req,res)=>{
     let {id}=req.params;
    const listing=await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit.ejs",{listing});
})

//update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    console.log(req.body);
    await Listing.findByIdAndUpdate(id,{...req.body});
    res.redirect("/listings");
})

//delete route
app.delete("/listings/:id",async (req,res)=>{
        let {id}=req.params;
        const deletedListing=await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("app listening on port 8080");
})