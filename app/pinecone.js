import { PineconeClient } from 'pinecone-client';

const client = new PineconeClient({
  apiKey: process.env.PINECONE_API_KEY,
});

async function setupIndex() {
  await client.createIndex({
    name: 'professors',
    dimension: 512, // Depending on your embedding model's output dimension
  });
}

setupIndex();
