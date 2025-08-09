const express = require("express");
const router = express.Router();
const { getUserQuery } = require("../controllers/generateQuiz");
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, getUserQuery);

module.exports = router;
