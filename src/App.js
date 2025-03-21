import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { formatQuestion, formatInitial, fetchAIResponse } from './prompt.js';

function App() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [currentWord, setCurrentWord] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    // Function to handle user input changes
    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    // Function to send the "generate a 20 questions word" prompt
    const sendInitialPrompt = async () => {
        const formattedPrompt = formatInitial(); // Format the initial prompt

        setLoading(true); // Start loading
        try {
            const aiResponse = await fetchAIResponse(formattedPrompt); // Fetch the AI response
            setCurrentWord(aiResponse); // Update currentWord state
            setAnswer("Ive thought of a word. Try and guess...");
            console.log("Generated word: " + aiResponse);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch response from the server.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Function to handle question submission
    const handleSubmit = async () => {
        if (!question.trim()) {
            alert('Please enter a question.');
            return;
        }
    
        const formattedPrompt = formatQuestion(question, currentWord); // Format the prompt

        setLoading(true); // Start loading
        try {
            const aiResponse = await fetchAIResponse(formattedPrompt); // Fetch the AI response
            setAnswer(aiResponse); // Update the answer state

            // Check for a correct guess
            if (aiResponse.toLowerCase().includes(currentWord.toLowerCase())) {
                console.log("Game over");
                sendInitialPrompt(); // Generate a new word
                setAnswer(aiResponse + " Coming up with a new word...");
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch response from the server.');
        } finally {
            setLoading(false); // Stop loading
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
                <h1>Twenty Questions Online</h1>
\                <input
                    id="question-input"
                    type="text"
                    placeholder="Type your question here"
                    value={question}
                    onChange={handleInputChange}
                    disabled={loading} // Disable input while loading
                />
                <button onClick={handleSubmit} disabled={loading}> {/* Disable button while loading */}
                    {loading ? 'Loading...' : 'Submit Question'}
                </button>
                {loading && <p>Loading...</p>} {/* Display loading message */}
                {answer && !loading && ( // Only show answer when not loading
                    <div>
                        <p>{answer}</p>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;