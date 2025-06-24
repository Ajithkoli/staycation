module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){     //the authentication is taken care and this is a passport middleware which checks if the user is logged in by using the 
                                    //session information read this from documentation
        req.flash("error","You must me logged in to create listing");
        return res.redirect("/login");
    }
    next();
}