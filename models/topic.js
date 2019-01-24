const mongoose = require("mongoose")


const topic_schema = mongoose.Schema({
  title: String,
  maintext: String,
  upvote: [{type: String}],
  downvote: [{type: String}],
  star: Boolean,
  active: Boolean 
}, {
  timestamps: {createdAt: "created_at"}
})

module.exports = mongoose.model("Topic", topic_schema)