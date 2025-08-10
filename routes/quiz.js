const express = require("express");
const router = express.Router();
const {
  getUserQuery,
  saveQuiz,
  getAllQuiz,
  getParticularQuiz,
  deleteParticularQuiz,
} = require("../controllers/generateQuiz");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, getUserQuery);
router.post("/save", authMiddleware, saveQuiz);
router.get("/getAll", authMiddleware, getAllQuiz);
router.get("/getParticular", authMiddleware, getParticularQuiz);
router.post("/deleteParticular", authMiddleware, deleteParticularQuiz);

module.exports = router;
