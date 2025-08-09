const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
  getUserFlashCard,
  saveFlashCard,
  getAllFlashCards,
  getParticularFlashCard,
} = require("../controllers/generateFlashCard");

router.post("/", authMiddleware, getUserFlashCard);
router.post("/save", authMiddleware, saveFlashCard);
router.get("/getAll", authMiddleware, getAllFlashCards);
router.get("/getParticular", authMiddleware, getParticularFlashCard);

module.exports = router;
