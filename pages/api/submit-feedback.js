import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback } = req.body;

    // Validate feedback
    if (!feedback || feedback.trim() === '') {
      return res.status(400).json({ error: 'Feedback cannot be empty' });
    }

    // Set up the database client
    const client = new Client({
      user: process.env.DB_USER,          // PostgreSQL username
      host: process.env.DB_HOST,          // PostgreSQL host
      database: process.env.DB_NAME,      // Database name
      password: process.env.DB_PASSWORD,  // PostgreSQL password
      port: process.env.DB_PORT,          // PostgreSQL port (default: 5432)
    });

    try {
      // Connect to the database
      await client.connect();

      // Insert the feedback into the database
      const query = 'INSERT INTO feedback (message) VALUES ($1)';
      await client.query(query, [feedback]);

      // Respond to the client
      res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    } finally {
      // Close the database connection
      await client.end();
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
