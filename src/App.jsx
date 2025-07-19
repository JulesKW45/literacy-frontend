import React, { useState } from 'react';
import './App.css';
import logo from './assets/literacy-blueprint-logo.png';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [science, setScience] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('https://evidence-based-literacy.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      if (data.error) {
        setResponse(`Error: ${data.error}`);
        setScience('');
        setPrompt('');
      } else {
        setResponse(data.response);
        setScience(data.science);
        setPrompt(data.prompt);
      }
    } catch (err) {
      setResponse(`Error: ${err.message}`);
      setScience('');
      setPrompt('');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="container">
      <header>
        <div className="header-content">
          <img src={logo} alt="The Literacy Blueprint Logo" className="logo" />
        </div>
      </header>

      <main>
        <div className="input-area">
          <input
            type="text"
            placeholder="Enter your literacy question…"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Thinking…' : 'Submit'}
          </button>
        </div>

        <div className="content">
          <div className="card response">
            <h2>📝 Response</h2>
            <p>{response || 'This is the response to your question. It provides clear, concise, and actionable advice you can apply directly in your literacy practice.'}</p>
          </div>

          <div className="card explanation">
            <h2>🔬 Science-based Explanation</h2>
            <p>{science || 'This answer is grounded in cognitive science, supported by research from trusted experts and evidence-based practices.'}</p>
          </div>

          <div className="card prompt">
            <h2>💡 Suggested AI Prompt</h2>
            <p>{prompt || 'Try this prompt in another AI tool: “Generate a lesson plan on phonemic awareness for Kindergarten using explicit instruction and retrieval practice.”'}</p>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2025 The Literacy Blueprint</p>
      </footer>
    </div>
  );
}

export default App;
