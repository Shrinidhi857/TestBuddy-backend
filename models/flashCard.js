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
  flashGroupName: { type: String, required: true },
  flashCards: [flashCardSchema],
});

module.exports = mongoose.model("FlashCard", flashCardGroup);
