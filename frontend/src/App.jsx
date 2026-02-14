import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('')
  const [subject, setSubject] = useState('OS')
  const [marks, setMarks] = useState('5')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!question.trim()) return;
    
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          question, 
          subject, 
          marks: parseInt(marks) 
        })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response. Ensure backend is running.');
      }
      
      const data = await res.json();
      setResponse(data.structured_answer);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Engineering Assignment Accelerator</h1>
        <p>Generate precise, structured answers for your engineering assignments.</p>
      </header>
      
      <main className="main-content">
        <div className="card input-section">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select 
              id="subject"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="OS">Operating Systems (OS)</option>
              <option value="DBMS">Database Management Systems (DBMS)</option>
              <option value="CN">Computer Networks (CN)</option>
              <option value="DSA">Data Structures & Algorithms (DSA)</option>
              <option value="SE">Software Engineering (SE)</option>
              <option value="SPCC">System Programming & Compiler Construction (SPCC)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="marks">Marks</label>
            <select 
              id="marks"
              value={marks} 
              onChange={(e) => setMarks(e.target.value)}
            >
              <option value="5">5 Marks</option>
              <option value="10">10 Marks</option>
              <option value="15">15 Marks</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="question">Question</label>
            <textarea 
              id="question"
              value={question} 
              onChange={(e) => setQuestion(e.target.value)} 
              placeholder="Enter your assignment question here..."
              rows={5}
            />
          </div>

          <button 
            className="generate-btn" 
            onClick={handleGenerate} 
            disabled={loading || !question.trim()}
          >
            {loading ? (
              <span className="loading-text">Generating Answer<span className="dot-1">.</span><span className="dot-2">.</span><span className="dot-3">.</span></span>
            ) : 'Generate Answer'}
          </button>
          
          {error && <p className="error-msg">{error}</p>}
        </div>

        {response && (
          <div className="card output-section fade-in">
            <h2>Generated Answer</h2>
            <div className="answer-content">
              {response.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
