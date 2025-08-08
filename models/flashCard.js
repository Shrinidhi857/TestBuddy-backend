const mongoose = required("mongoose");
const flashCardSchema = mongoose.Schema({
  no: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    requried: true,
  },
});

module.exports = mongoose.model("FlashCard", flashCardSchema);
