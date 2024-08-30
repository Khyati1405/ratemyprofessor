import { PineconeClient } from 'pinecone-client';
import { Configuration, OpenAIApi } from 'openai';

const pinecone = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function ingestData(professors) {
  const embeddings = await Promise.all(
    professors.map(async (professor) => {
      const response = await openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: `${professor.name}: ${professor.review}`,
      });
      return {
        id: professor.id,
        values: response.data.embedding,
        metadata: { name: professor.name, review: professor.review },
      };
    })
  );

  await pinecone.upsert({
    indexName: 'professors',
    vectors: embeddings,
  });
}
