import React, { useState } from 'react';
import './App.css'; // Your updated CSS file

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(''); // Clear previous result

    try {
      const response = await fetch('http://localhost:5001/api/detect-cyberbullying', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setResult(data.response); // Display the result from the backend
    } catch (error) {
      setResult('Error detecting cyberbullying.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Cyberbullying Detection Tool</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          rows="5"
        ></textarea>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Checking...' : 'Check for Cyberbullying'}
        </button>
      </form>
      {result && (
        <div className="result">
          <p>{result}</p>
          {/* <div className="sender-info">
            Sender info: <strong>male, 1200 followers</strong>
          </div>
          <div className="receiver-info">
            Receiver info: <strong>female, 1100 followers</strong>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default App;
