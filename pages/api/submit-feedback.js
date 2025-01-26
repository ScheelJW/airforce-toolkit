import { Client } from "pg";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure this is set in your environment variables
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

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false, // Use SSL if connecting to managed databases
    },
  });

  try {
    // Generate a custom AI response
    const prompt = `
      You are an AI assistant for Air Force/Space Force applications. Analyze the feedback provided below and generate a customized response:

      Feedback: "${feedback}"

      If the feedback is specific to an app (e.g., EPB, Safety App, News Updates), address the feedback appropriately and acknowledge the input.
      If the feedback is unrelated to Air Force/Space Force topics, respond with a humorous and friendly comment.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Or "gpt-4" if you have access
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content.trim();

    // Connect to the database
    await client.connect();

    // Save the feedback, AI response, and timestamp to the database
    const query = `
      INSERT INTO feedback (message, ai_response, date_time)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [feedback, aiResponse, new Date().toISOString()];

    const result = await client.query(query, values);

    // Send the response back to the client
    res.status(200).json({
      message: "Feedback submitted successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback." });
  } finally {
    await client.end();
  }
}
