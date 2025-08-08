const express = required("express");

async function GenerateQuiz(userText) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD1_28vu9n-Fn4YfcKdXL7E3AvjuW2pb0c",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }],
      }),
    }
  );

  const data = await res.json();
  const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const jsonStart = output.indexOf("[");
    const jsonEnd = output.lastIndexOf("]") + 1;

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("JSON brackets not found in response.");
    }

    const jsonString = output.substring(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonString);
    console.log("✅Quiz got fetched!");
  } catch (parseError) {
    console.error("Failed to parse quiz data:", parseError);
  }
}
module.exports = {
  GenerateQuiz,
};
