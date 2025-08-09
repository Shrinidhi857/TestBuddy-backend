const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const { getUserFlashCard } = require("../controllers/generateFlashCard");

router.post("/", authMiddleware, getUserFlashCard);

module.exports = router;
