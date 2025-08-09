const express = require("express");
const fetch = require("node-fetch");

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

module.exports = {
  getUserQuery,
  GenerateQuiz,
};
