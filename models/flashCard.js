const mongoose = require("mongoose");
const flashCardSchema = mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  front: {
    type: String,
    required: true,
  },
  back: {
    type: String,
    requried: true,
  },
});

const flashCardGroup = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  flashgroupName: { type: String, required: true },
  flashcards: [flashCardSchema],
});

module.exports = mongoose.model("FlashCard", flashCardGroup);
