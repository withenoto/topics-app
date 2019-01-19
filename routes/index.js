const express   = require('express');
const router    = express.Router();
const User      = require("../models/user")
const passport  = require("passport")
const ensureLogin = require("connect-ensure-login");
const bcrypt  = require("bcrypt")

// Topics

router.get("/topics", (req, res) => {
  res.render("topics")
})


// LOG IN

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/fail",
  //failureFlash: true,
  passReqToCallback: true
}));

router.get("/fail", (req, res) => {
  res.send("did not work")
})


// SIGN UP

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post("/signup", (req, res) => {

  var email = req.body.email
  var password = req.body.password

  if(email === "" || password === "") {
    res.render("signup", {err: "all fields required"});
    return;
  }

  User.findOne({email: email}).then(user => {
    if(user !== null) {
      res.render("signup", {err: "user already exists!"});

      return;
    }

  const salt     = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser  = new User({
    email: email,
    password: hashPass
  });

  newUser.save().then(() => {
    res.redirect("/")
  })

}).catch(err => {console.log(err)})

})


module.exports = router;
