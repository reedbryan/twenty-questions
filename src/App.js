import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { formatQuestion, formatInitial } from './prompt.js';

function App() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [currentWord, setCurrentWord] = useState('');

    // Function to handle user input changes
    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    // Function to send the "generate a 20 questions word" prompt
    const sendInitialPrompt = async () => {
        const formattedPrompt = formatInitial(); // Format the prompt

        try {
            const response = await fetch('/.netlify/functions/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput: formattedPrompt }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from the server');
            }

            const data = await response.json();
            setCurrentWord(data.response); // Update currentWord state
            console.log("Generated word: " + data.response);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch response from the server.');
        }
    };

    // Function to handle question submission
    const handleSubmit = async () => {
        if (!question.trim()) {
            alert('Please enter a question.');
            return;
        }
    
        const formattedPrompt = formatQuestion(question, currentWord); // Format the prompt
    
        try {
            const response = await fetch('/.netlify/functions/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput: formattedPrompt }), // Send the formatted prompt
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch response from the server');
            }
    
            const data = await response.json();
            setAnswer(data.response);

            // Check for a correct guess
            if (data.response === "Yes! The word I was thinking of was " + currentWord + ".") {
                console.log("Game over");
                sendInitialPrompt(); // Generate a new word
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch response from the server.');
        }
    
        setQuestion(''); // Clear the input field after submission
    };

    // Send the initial "generate a word" prompt when the app loads
    useEffect(() => {
        sendInitialPrompt();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

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
                    value={question}
                    onChange={handleInputChange}
                />
                <button onClick={handleSubmit}>Submit Question</button>
                {answer && (
                    <div>
                        <h3>Response:</h3>
                        <p>{answer}</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;