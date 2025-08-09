const express = require("express");
const router = express.Router();
const {
  getUserQuery,
  saveQuiz,
  getAllQuiz,
  getParticularQuiz,
} = require("../controllers/generateQuiz");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, getUserQuery);
router.post("/save", authMiddleware, saveQuiz);
router.get("/getAll", authMiddleware, getAllQuiz);
router.get("/getParticular", authMiddleware, getParticularQuiz);

module.exports = router;
