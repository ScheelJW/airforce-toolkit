import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { feedback } = req.body;

    if (!feedback || feedback.trim() === '') {
      return res.status(400).json({ error: 'Feedback cannot be empty' });
    }

    const client = new Client({
      user: 'your-db-username',
      host: 'your-db-host',
      database: 'your-database-name',
      password: 'your-db-password',
      port: 5432, // Default PostgreSQL port
    });

    try {
      await client.connect();
      const query = 'INSERT INTO feedback (message) VALUES ($1)';
      await client.query(query, [feedback]);
      await client.end();

      res.status(200).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit feedback' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
