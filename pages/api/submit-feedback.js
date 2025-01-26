import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { feedback } = req.body;

  if (!feedback || feedback.trim() === '') {
    return res.status(400).json({ error: 'Feedback cannot be empty' });
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    connectionTimeoutMillis: 5000, // Timeout in milliseconds
  });

  try {
    console.log('Connecting to the database...');
    await client.connect();
    console.log('Connected successfully!');

    const query = 'INSERT INTO feedback (message) VALUES ($1)';
    await client.query(query, [feedback]);
    console.log('Feedback inserted successfully!');

    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to submit feedback.' });
  } finally {
    await client.end();
  }
}
