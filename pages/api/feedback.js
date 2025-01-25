export const runtime = 'edge';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const feedback = req.body;
    console.log("Received feedback:", feedback);

    // Simulate saving feedback to a database or performing some action
    res.status(200).json({ message: "Feedback received successfully!" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
