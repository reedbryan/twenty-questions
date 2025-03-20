// filepath: /Users/reedbryan/Documents/WebDev/react/twenty-questions/src/App.js
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { OpenAI } from 'openai';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) {
      alert('Please enter a question.');
      return;
    }
  
    try {
      const response = await fetch('/.netlify/functions/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }
  
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch response from the server.');
    }
  
    setUserInput(''); // Clear the input field after submission
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Twenty Questions Online</p>
        <label htmlFor="question-input">Your Question:</label>
        <input
          id="question-input"
          type="text"
          placeholder="Type your question here"
          value={userInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit Question</button>
        {response && (
          <div>
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;