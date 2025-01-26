import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false, // Use SSL if connecting to managed services like Linode
    },
  });

  try {
    await client.connect();
    const result = await client.query('SELECT COUNT(*) FROM feedback');
    const count = parseInt(result.rows[0].count, 10);
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching feedback count:', error);
    res.status(500).json({ error: 'Failed to fetch feedback count.' });
  } finally {
    await client.end();
  }
}
