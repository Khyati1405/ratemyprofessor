import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { query } = req.body;

  // Use OpenAI to process the query
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Provide a summary of reviews and ratings for the professor: ${query}`,
    max_tokens: 100,
  });

  const generatedText = response.data.choices[0].text.trim();

  res.status(200).json({ results: [{ name: query, review: generatedText }] });
}
