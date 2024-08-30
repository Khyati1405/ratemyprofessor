import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Rate My Professor AI Assistant</h1>
      <input
        type="text"
        className="border p-2 w-full mb-4"
        placeholder="Search for a professor..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Search
      </button>

      <div className="mt-4">
        {results.map((result, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-bold">{result.name}</h2>
            <p>{result.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
