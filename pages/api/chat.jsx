
import OpenAI from 'openai';

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { messages } = req.body;

    try {
      const client = new OpenAI({ baseURL: endpoint, apiKey: token });

      const response = await client.chat.completions.create({
        messages: messages,
        model: modelName,
        temperature: 1.0,
        max_tokens: 1000,
        top_p: 1.0
      });

      res.status(200).json({ message: response.choices[0].message });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}