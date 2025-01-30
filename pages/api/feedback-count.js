import { Client } from 'pg';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Debugging: Log the connection details (excluding sensitive info like passwords)
  console.log('Database Connection Details:', {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: process.env.DB_SSL || 'Not Set',
  });

  // Initialize the database client
  const client = new Client({
    user: process.env.DB_USER, // Database username
    host: process.env.DB_HOST, // Database host
    database: process.env.DB_NAME, // Database name
    password: process.env.DB_PASSWORD, // Database password
    port: process.env.DB_PORT, // Database port
    ssl: {
      rejectUnauthorized: false, // Handle SSL certificates
    },
  });

  try {
    // Try to connect to the database
    await client.connect();
    console.log('Connected to the database successfully.');

    // Execute the query to count feedback rows
    const result = await client.query('SELECT COUNT(*) FROM feedback');
    const count = parseInt(result.rows[0].count, 10);

    // Send the response
    res.status(200).json({ count });
  } catch (error) {
    // Log errors on failure
    console.error('Error fetching feedback count:', {
      message: error.message,
      stack: error.stack,
    });

    // Return error response
    res.status(500).json({ error: 'Failed to fetch feedback count.' });
  } finally {
    // Always close the database connection
    await client.end();
    console.log('Database connection closed.');
  }
}