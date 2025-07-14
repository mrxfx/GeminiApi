// File: api/gemini.js

export default async function handler(req, res) {
  const apiKey = 'AIzaSyCkFpHM16XsJsMTPuLGDMjHGRYZKoPGukY'; // Gemini API Key
  const question = req.query.ask?.trim();

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  });

  if (!question) {
    return res.status(400).json({
      status: "error",
      message: "Missing required 'ask' parameter.",
      timestamp: timestamp + " IST",
      created_by: "Rahul 😴"
    });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: question }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await response.json();

    const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (reply) {
      return res.status(200).json({
        question,
        response: reply,
        status: "success",
        timestamp: timestamp + " IST",
        created_by: "Rahul 😴"
      });
    } else {
      return res.status(500).json({
        question,
        status: "error",
        message: result?.error?.message || "Unknown error",
        timestamp: timestamp + " IST",
        created_by: "Rahul 😴"
      });
    }

  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
      timestamp: timestamp + " IST",
      created_by: "Rahul 😴"
    });
  }
}
