const express   = require('express');
const router    = express.Router();
const User      = require("../models/user")
const Topic    = require("../models/topic")
const passport  = require("passport")
const ensureLogin = require("connect-ensure-login");


// private topic page

router.get("/topics", ensureLogin.ensureLoggedIn("/auth/login"), (req, res) => {

  Topic.find().then(topics => 
    {
      topics.user = req.user
      res.render("topics", {topics})}) 
});

// add new topic


router.post("/submittopic", ensureLogin.ensureLoggedIn("/auth/login"), (req, res) => {

  var title = req.body.title
  var maintext = req.body.maintext

  Topic.create({
    title: title,
    maintext: maintext
  }).then(() => {

res.redirect("/topics")
  

    })
});


// AXIOS
router.get("/getid", (req, res) => {
  
})

router.post("/:topicid/upvote", (req, res) => {
  // welches topic - upvote
console.log(req.params.topicid)
  // welcher user?
  var user = "234"

 // Topic.updateOne({id= req.params.topicid}, {upvote.push(user)})
})




module.exports = router;
