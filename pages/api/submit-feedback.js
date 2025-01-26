import { Client } from 'pg';

export default async function handler(req, res) {
  // Allow POST requests only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { feedback } = req.body;

  // Validate input
  if (!feedback || feedback.trim() === '') {
    return res.status(400).json({ error: 'Feedback cannot be empty' });
  }

  // PostgreSQL client configuration
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    // Connect to the database
    console.log('Connecting to the database...');
    await client.connect();

    // Insert feedback into the database
    console.log('Inserting feedback into the database...');
    const query = 'INSERT INTO feedback (message) VALUES ($1)';
    await client.query(query, [feedback]);

    // Send success response
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error in /api/submit-feedback:', error);

    // Handle specific database connection errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({ error: 'Database connection was refused' });
    }

    // General error response
    res.status(500).json({ error: 'Failed to submit feedback. Please try again later.' });
  } finally {
    // Close the database connection
    console.log('Closing database connection...');
    await client.end();
  }
}
