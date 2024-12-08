const express = require("express"); 
const passport = require("passport"); 
const router = express.Router();

router.all("*", function (req, res, next) {
   passport.authenticate("jwt", { session: false }, function (err, user, info) {
        console.log("router.all err: ", err?.message);
        console.log("router.all user:", user); // user from the decoded BM 
        console.log("router.all info: ", info?.message); // info is an "Error object. B. Don't even make it through the get wr function check. Mostoken. // (message in info parom: "No authtoken") 700. Invalid token 
        
        if (info) {
            console.log( 
                "I happened because the token was either invalid or not present." 
            );
            
            
           
            return res.send(info.message); 
        
        }


        if (err) {
            console.log(
                "I happened because you logged in with the user 'tokenerror' and tried to visit a route that passes through this jwt authentcation.We are simulating an application error. "
            );

            return res.send(err.message);
        }

        if (!user) {

            return res.send(
                "We're simulating an empty user being decoded from the token."
            );
        }


        if (user) {
            console.log("req.login? ", req.login);
            req.isAuthenticated = true;
            req.user = user;
            return next();
        }

    })(req, res, next);
});

router.get("/profile", (req, res, next) => {
    console.log("----beginning of /profile----");
    console.log("isAuthenticated: ", req.isAuthenticated);

    console.log("req.user: ", req.user);
    console.log("req.login: ", req.login);
    console.log("req.logout: ", req.logout);
    res.json({
        user: req.user,
        message: "Hello friend",
    });
});

router.get("/settings", (req, res, next) => {
    res.jsom({
        user: req.user,
        message: "Settings page",
    });
});

module.exports = router 