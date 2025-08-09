const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const {
  getUserFlashCard,
  saveFlashCard,
} = require("../controllers/generateFlashCard");

router.post("/", authMiddleware, getUserFlashCard);
router.post("/save", authMiddleware, saveFlashCard);

module.exports = router;
