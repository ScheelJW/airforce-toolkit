import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { feedback } = req.body;

  if (!feedback || feedback.trim() === "") {
    return res.status(400).json({ error: "Feedback cannot be empty" });
  }

  try {
    const prompt = `
      You are an AI assistant for Air Force/Space Force applications. Analyze the feedback provided below and generate a customized response:

      Feedback: "${feedback}"

      If the feedback is specific to an app (e.g., EPB, Safety App, News Updates), address the feedback appropriately and acknowledge the input.
      If the feedback is unrelated to Air Force/Space Force topics, respond with a humorous and friendly comment.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Switch to gpt-4 if available
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const generatedMessage = completion.choices[0].message.content.trim();

    res.status(200).json({ generatedMessage });
  } catch (error) {
    console.error("Error generating feedback:", error);
    res.status(500).json({ error: "Failed to process feedback." });
  }
}
