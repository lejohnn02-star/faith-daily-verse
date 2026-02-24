export default async function handler(req, res) {
  const today = new Date().toISOString().split("T")[0];

  const prompt = `
  Generate one short original Bible-style verse.
  Do NOT copy scripture.
  Make it Christ-centered, bold, poetic, and streetwear aesthetic.
  Under 25 words.
  Include a reference like Faith ${today}.
  Return in this format:

  Verse text here
  Faith ${today}
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9
      })
    });

    const data = await response.json();
    const verse = data.choices[0].message.content;

    res.status(200).json({ verse });

  } catch (error) {
    res.status(500).json({
      verse: "Walk by faith, not by fear.\nFaith 1:1"
    });
  }
}
