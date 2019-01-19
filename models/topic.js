const mongoose = require("mongoose")


const topic_schema = mongoose.Schema({
  title: String,
  maintext: String,
  upvote: [{type: String}],
  downvote: [{type: String}],
  star: Boolean,
  active: Boolean 
}, {
  timestamps: true
})

module.exports = mongoose.model("User", user_schema)