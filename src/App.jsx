import { useState } from 'react';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse('');

    try {
      const res = await fetch('https://evidence-based-literacy.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setResponse(data.answer || 'No response received.');
    } catch (err) {
      setResponse('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <h1>📚 Evidence-Based Literacy Coach</h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
      ></textarea>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      <div className="response">
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
