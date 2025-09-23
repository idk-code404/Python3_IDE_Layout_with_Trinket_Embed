// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.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; // put your key in .env

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }]
    })
  });

  const data = await r.json();
  const reply = data.choices?.[0]?.message?.content || "Error";

  res.json({ reply });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
