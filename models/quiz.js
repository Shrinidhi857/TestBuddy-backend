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

const quizGroup = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  quizName: { type: String, required: true, unique: true },
  quizes: [quizSchema],
});

module.exports = mongoose.model("Quiz", quizGroup);
