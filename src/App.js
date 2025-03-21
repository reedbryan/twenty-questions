import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';import { formatQuestion, formatInitial, fetchAIResponse } from './prompt.js';

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
        const formattedPrompt = formatInitial(); // Format the initial prompt

        try {
            const aiResponse = await fetchAIResponse(formattedPrompt); // Fetch the AI response
            setCurrentWord(aiResponse); // Update currentWord state
            setAnswer("Ive thought of a word. Try and guess...");
            console.log("Generated word: " + aiResponse);
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
            const aiResponse = await fetchAIResponse(formattedPrompt); // Fetch the AI response
            setAnswer(aiResponse); // Update the answer state

            // Check for a correct guess
            if (aiResponse.includes(currentWord)) {
                console.log("Game over");
                sendInitialPrompt(); // Generate a new word
                setAnswer(aiResponse + " Coming up with a new word...");
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