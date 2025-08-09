const express = require("express");
const fetch = require("node-fetch");
const Quiz = require("../models/quiz");
const mongoose = require("mongoose");
const { Types } = require("mongoose");
const ObjectId = Types.ObjectId;

async function getUserQuery(req, res) {
  try {
    const text = req.body.text;
    const QuizJson = await GenerateQuiz(text);

    if (!QuizJson) {
      return res.status(500).json({ error: "Failed to generate quiz" });
    }
    res.json(QuizJson);
  } catch (err) {
    console.error("Error in getUserQuery:", err);
    res.status(500).json({ error: "Server error" });
  }
}

async function GenerateQuiz(userText) {
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAarZQf21RO5ByZtOV7XIBY6fRqfDlknZ4",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }],
      }),
    }
  );

  const data = await response.json();
  const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const jsonStart = output.indexOf("[");
    const jsonEnd = output.lastIndexOf("]") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("JSON brackets not found in response.");
    }

    const jsonString = output.substring(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonString);

    console.log("✅ Quiz fetched successfully!");
    return parsed;
  } catch (parseError) {
    console.error("⚠️Failed to parse quiz data:", parseError);
    return null;
  }
}
async function saveQuiz(req, res) {
  const userId = req.user._id; // now exists because JWT contains _id
  const { quizName, quizes } = req.body;
  console.log("❤️Decoded user from token:", req.user);

  try {
    const newQuiz = new Quiz({
      userId: req.user._id,
      quizName: req.body.quizName,
      quizes: req.body.quizes,
    });

    await newQuiz.save();

    res.json({ message: "Quiz Saved!", quiz: newQuiz });
  } catch (err) {
    console.error("⚠️ Failed to store:", err);
    res.status(500).json({ message: "Quiz not saved" });
  }
}

async function getAllQuiz(req, res) {
  try {
    const userId = req.user._id;
    const quizzes = await Quiz.find({ userId });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getParticularQuiz(req, res) {
  try {
    const { quizName } = req.body;
    const userId = req.user._id;

    if (!quizName) {
      return res.status(400).json({ message: "quizName is required" });
    }

    console.log("User ID from token:", userId);
    console.log("Quiz name from body:", quizName);

    const quiz = await Quiz.findOne({
      quizName: { $regex: new RegExp(`^${quizName}$`, "i") }, // case-insensitive
      userId: new ObjectId(String(userId)), // match type
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getUserQuery,
  GenerateQuiz,
  saveQuiz,
  getAllQuiz,
  getParticularQuiz,
};
