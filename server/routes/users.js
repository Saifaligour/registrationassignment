var express = require('express');
var router = express.Router();
var Users = require("../model/user");
var passport = require('passport');
/* GET users listing. */
// for login the user
router.post('/login',(req, res, next)=>{
  
    passport.authenticate('local', function(err, user, info) {
    
        if (err) { return res.status(501).json(err); }
        if (!user) { return  res.status(502).json(info); }
        req.logIn(user, function(err) {
            
          if (err) { res.status(501).json(err); }
          return  res.status(201).json({message:"Login successfully"});
        });
      })(req, res, next);
});

// for register the user in to data base
router.post("/register", (req, res) => {
    addToDb(req, res)
   
})

async function addToDb(req, res) {
    
    var user = new Users({
        name:req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        password: Users.hashPassword(req.body.pass),
        creation_date: Date.now()
    })
    try {
        doc = await user.save();
        res.status(201).json(doc)
    }
    catch (err) {
        res.status(501).json(err)
    }
}

module.exports = router;

