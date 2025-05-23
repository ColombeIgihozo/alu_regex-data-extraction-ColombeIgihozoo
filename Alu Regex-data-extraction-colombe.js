import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState({});

  // Regular expression patterns for extracting specific data types
  const regexPatterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    url: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g,
    phone: /(?:\(\d{3}\)\s?|\d{3}[.-]?)\d{3}[.-]?\d{4}/g,
    creditCard: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    time: /\b(1[0-2]|0?[1-9]):[0-5][0-9](\s?[APap][Mm])?|([01]?[0-9]|2[0-3]):[0-5][0-9]\b/g,
    htmlTags: /<[^>]+>/g,
    hashtags: /#\w+/g,
    currency: /\$\d{1,3}(,\d{3})*(\.\d{2})?/g
  };

  const handleExtract = () => {
    const extracted = {};
    for (const [key, regex] of Object.entries(regexPatterns)) {
      extracted[key] = input.match(regex) || [];
    }
    setResult(extracted);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Regex Data Extractor</h1>
      <textarea
        className="w-full p-2 border rounded mb-4"
        rows="6"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your text here..."
      ></textarea>
      <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleExtract}>Extract Data</button>

      <div className="mt-6">
        {Object.keys(result).map((key) => (
          <div key={key} className="mb-4">
            <h2 className="font-semibold text-lg">{key.toUpperCase()}</h2>
            <ul className="list-disc pl-5">
              {result[key].map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
