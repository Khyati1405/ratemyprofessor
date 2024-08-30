import { PineconeClient } from 'pinecone-client';
import { Configuration, OpenAIApi } from 'openai';

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { query } = req.body;

  // Generate an embedding for the search query
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: query,
  });

  const embedding = response.data.embedding;

  // Search Pinecone for the most similar professor
  const searchResults = await pinecone.query({
    indexName: 'professors',
    queryRequest: {
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    },
  });

  const results = searchResults.matches.map((match) => ({
    name: match.metadata.name,
    review: match.metadata.review,
  }));

  res.status(200).json({ results });
}
