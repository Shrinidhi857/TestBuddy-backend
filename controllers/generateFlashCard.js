const express = require("express");
const fetch = require("node-fetch");
const FlashCard = require("../models/flashCard");
const mongoose = require("mongoose");
const { Types } = require("mongoose");
const ObjectId = Types.ObjectId;

async function getUserFlashCard(req, res) {
  try {
    const text = req.body.text;
    const FlashCardJson = await GenerateFlashCard(text); // single n
    console.log(FlashCardJson);

    if (!FlashCardJson) {
      return res.status(500).json({ error: "Failed to generate FlashCard" });
    }
    res.json(FlashCardJson);
  } catch (err) {
    console.error("Error in getUserQuery:", err);
    res.status(500).json({ error: "Server error" });
  }
}

async function GenerateFlashCard(userText) {
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

async function saveFlashCard(req, res) {
  try {
    const newFlashCards = new FlashCard({
      userId: req.user._id,
      flashGroupName: req.body.flashgroupName,
      flashCards: req.body.flashCards,
    });
    newFlashCards.save();

    res.json({ message: "FlashCard got Saved!", flashCard: newFlashCards });
  } catch (err) {
    console.error("⚠️ Failed to store:", err);
    res.status(500).json({ message: "FlashCard not saved" });
  }
}

async function getAllFlashCards(req, res) {
  try {
    const userId = req.user._id;
    const flashCards = await FlashCard.find({ userId });
    res.json(flashCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function getParticularFlashCard(req, res) {
  try {
    const { flashCardName } = req.body;
    const userId = req.user._id;

    if (!flashCardName) {
      return res.status(400).json({ message: "flashCardName is required" });
    }

    console.log("User ID from token:", userId);
    console.log("flashCardName name from body:", flashCardName);

    const flashCard = await FlashCard.findOne({
      flashGroupName: { $regex: new RegExp(`^${flashCardName}$`, "i") }, // case-insensitive
      userId: new ObjectId(String(userId)), // match type
    });

    if (!flashCard) {
      return res.status(404).json({ message: "FlashCard  not found" });
    }

    res.json(flashCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getUserFlashCard,
  GenerateFlashCard,
  saveFlashCard,
  getAllFlashCards,
  getParticularFlashCard,
};
