import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Store your OpenAI API key in environment variables
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { feedback } = req.body;

  if (!feedback || feedback.trim() === '') {
    return res.status(400).json({ error: 'Feedback cannot be empty' });
  }

  try {
    const prompt = `
      You are an Air Force/Space Force support assistant. Analyze the following feedback and provide a customized response:
      Feedback: "${feedback}"
      
      If the feedback mentions any apps (e.g., EPB, Safety app), address them specifically. If the feedback is unrelated to the Air Force or Space Force, respond humorously.
    `;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
    });

    const generatedMessage = completion.data.choices[0].text.trim();

    res.status(200).json({ generatedMessage });
  } catch (error) {
    console.error('Error generating feedback:', error);
    res.status(500).json({ error: 'Failed to process feedback.' });
  }
}
