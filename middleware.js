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