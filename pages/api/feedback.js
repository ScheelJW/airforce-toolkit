export const runtime = "edge";

export default async function handler(req, event) {
  if (req.method === "POST") {
    const feedback = await req.json(); // Use edge-compatible req.json()
    console.log("Feedback received:", feedback);

    return new Response(
      JSON.stringify({ message: "Feedback received successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Method Not Allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}
