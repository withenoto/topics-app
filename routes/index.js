const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");
const Topic = require("../models/topic");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

router.get("/", (req, res) => {
  res.render("login");
});

// private topic page
router.get("/topics", ensureLogin.ensureLoggedIn("/auth/login"), (req, res) => {
  Topic.find().then(topics => {

    var sortedtopics = topics.sort((a,b) => {

      a = a.upvote.length
      b = b.upvote.length
 
      return b-a;
 
     })

    sortedtopics.user = req.user;
    res.render("topics", {sortedtopics});

  });
});

// add new topic
router.post(
  "/submittopic",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res) => {
    var title = req.body.title;
    var maintext = req.body.maintext;

    Topic.create({
      title: title,
      maintext: maintext
    }).then(() => {
      res.redirect("/topics");
    });
  }
);

// AXIOS

router.post(
  "/:topicid/upvote",
  ensureLogin.ensureLoggedIn("/auth/login"),
  (req, res) => {
    var user = mongoose.Types.ObjectId(req.user.id);
    var topic = req.params.topicid;

    Topic.find({ _id: topic, upvote: { $in: [user] } })
      .then(upvote => {
        if (upvote.length === 0) {
          Topic.updateOne({ _id: topic }, { $push: { upvote: user } }).then(
            topic => {

                res.send(topic)
              // console.log(topic)
              // res.send(topic);
            }
          );
        } else {
          Topic.updateOne({ _id: topic }, { $pull: { upvote: user } }).then(
            () => {
              console.log("worked");
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
);


router.get("/gettopics", (req, res) => {

  Topic.find().then(topics => {
    
    var sortedtopics = topics.sort((a,b) => {

      a = a.upvote.length
      b = b.upvote.length
 
      return b-a;
 
     })
    
     res.send(sortedtopics)
  })

})

module.exports = router;
