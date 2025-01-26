import { Client } from "pg";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

const THROTTLE_LIMIT = 2; // Max feedbacks per hour

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { feedback } = req.body;
  const userIp = req.headers["x-forwarded-for"] || req.connection.remoteAddress; // Capture user's IP

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
    // Connect to the database
    await client.connect();

    // Check throttle: Count feedback submissions from this IP in the last hour
    const throttleQuery = `
      SELECT COUNT(*) as feedback_count 
      FROM feedback 
      WHERE ip_address = $1 AND date_time > NOW() - INTERVAL '1 hour';
    `;
    const throttleResult = await client.query(throttleQuery, [userIp]);

    if (parseInt(throttleResult.rows[0].feedback_count, 10) >= THROTTLE_LIMIT) {
      return res.status(429).json({
        error: "You can only submit up to 2 feedbacks per hour. Please try again later.",
      });
    }

    // Generate a custom AI response using OpenAI
    const prompt = `
      You are an AI assistant for Air Force/Space Force applications. Evaluate the feedback provided below. Determine if it is relevant to Air Force or Space Force applications. If relevant, summarize the feedback in a polite and concise response that addresses the user's input and always ends with "Thank you for your feedback." If the feedback is irrelevant or nonsensical, respond with a humorous message explaining that it is not being saved.

      Feedback: "${feedback}"
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use gpt-4 if available
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0]?.message?.content?.trim();
    if (!aiResponse) {
      return res.status(500).json({ error: "Failed to generate an AI response." });
    }

    // Determine if the feedback is irrelevant based on the AI response
    const isIrrelevant = aiResponse.toLowerCase().includes("not being saved");
    if (isIrrelevant) {
      return res.status(400).json({ error: aiResponse }); // Show the humorous response in the modal
    }

    // Save the feedback, AI response, and timestamp to the database
    const query = `
      INSERT INTO feedback (message, ai_response, date_time, ip_address)
      VALUES ($1, $2, $3, $4)
      RETURNING ai_response;
    `;
    const values = [feedback, aiResponse, new Date().toISOString(), userIp];

    const result = await client.query(query, values);

    // Send the AI response back to the frontend
    res.status(200).json({
      message: result.rows[0].ai_response, // Return only the AI-generated response
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback." });
  } finally {
    await client.end();
  }
}
