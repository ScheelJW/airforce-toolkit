import { Client } from "pg";
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

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false, // Use SSL for secure connections to managed databases
    },
  });

  try {
    // Generate a custom AI response using OpenAI
    const prompt = `
      You are an AI assistant for Air Force/Space Force applications. Analyze the feedback provided below and generate a customized response:

      Feedback: "${feedback}"

      If the feedback is specific to an app (e.g., EPB, Safety App, News Updates), address the feedback appropriately and acknowledge the input.
      If the feedback is unrelated to Air Force/Space Force topics, respond with a humorous and friendly comment.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use gpt-4 if available
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0].message.content.trim();

    // Connect to the database
    await client.connect();

    // Insert the feedback, AI response, and current timestamp into the database
    const query = `
      INSERT INTO feedback (message, ai_response, date_time)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [feedback, aiResponse, new Date().toISOString()];

    const result = await client.query(query, values);

    // Send the inserted row data, including the AI response, back to the frontend
    res.status(200).json({
      message: "Feedback submitted successfully!",
      ai_response: result.rows[0].ai_response,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback." });
  } finally {
    await client.end();
  }
}
