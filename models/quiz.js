const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  no: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Array of strings
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
