function logger(req, res, next){
    console.log("New request :", new Date().toLocaleString(), " , Method: ",req.method, " , URL: ", req.url, "auth header: ", req.headers.authorization ? req.headers.authorization : "null");
    
    req.randomKey = "This is random key"
    
    
    next();
}

function isAuthenticated(req, res, next){
    // console.log("----------", req.headers.authorization);

    
    if(!req.headers.authorization || req.headers.authorization === "null"){
        // return res.redirect("auth/login")
        return res.status(200).json({
            redirect: true
        })
    }
    next()
}

module.exports = {
    logger, isAuthenticated
}