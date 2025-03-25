import git_logo from './logos/logo-github.svg';
import react_logo from './logos/logo-react.svg';
import openAI_logo from './logos/logo-openai.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { formatQuestion, formatInitial, fetchAIResponse } from './prompt.js';

function App() {
    const [question, setQuestion] = useState('');          // Track user input (questions)
    const [answer, setAnswer] = useState('');              // Track AI's responses
    const [currentWord, setCurrentWord] = useState('');    // Track the current word being guessed
    const [loading, setLoading] = useState(false);         // Track loading state (true when waiting for AI response)
    const [questionCount, setQuestionCount] = useState(20); // Track the number of questions asked
    const [questionLog, setQuestionLog] = useState([]);    // Log of past questions and answers
    const [gameOver, setGameOver] = useState(false);       // Track game state (true when the word has been guessed)

    // Function to handle user input changes
    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    // Function to send the "generate a 20 questions word" prompt
    const sendInitialPrompt = async () => {
        
        const formattedPrompt = formatInitial(); // Format the initial prompt

        setLoading(true); // Start loading
        try {
            // Fetch the AI response
            const aiResponse = await fetchAIResponse(formattedPrompt);
            
            // Update currentWord state with the generated word & Update the answer state with an appropriate message
            setCurrentWord(aiResponse);
            setAnswer("I've thought of a word. Ask me questions to try and guess it.");
            
            // Reset states
            setQuestionCount(20); 
            setQuestionLog([]); 
            setGameOver(false);
            
            // DEBUG
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
            // Fetch the AI response & Update the answer state
            const aiResponse = await fetchAIResponse(formattedPrompt);
            setAnswer(aiResponse);

            // Update question count and log
            setQuestionCount((prevCount) => prevCount - 1); // Increment question count
            setQuestionLog((prevLog) => [...prevLog, { question, answer: aiResponse }]); // Add to log

            // Check for a correct guess
            if (aiResponse.toLowerCase().includes(currentWord.toLowerCase())) {
                console.log("Game over, correct guess");
                setGameOver(true); // Set gameOver to true
            }
            // Check for 20 questions asked
            if (questionCount <= 0) {
                console.log("Game over, 20 questions asked");
                setGameOver(true); // Set gameOver to true
            }

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to fetch response from the server.');
        } finally {
            setLoading(false); // Stop loading
        }
    
        setQuestion(''); // Clear the input field after submission
    };

    const restartGame = () => {
        sendInitialPrompt(); // Generate a new word
        setAnswer("Coming up with a new word...");
    }

    // Send the initial "generate a word" prompt when the app loads
    useEffect(() => {
        //sendInitialPrompt();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <div className="App">
            <header className="App-header">                

                <h1>20 QUESTIONS ONLINE</h1>
                
                <div className="App-logos">
                    <a href="https://github.com/reedbryan/twenty-questions" target="_blank" rel="noopener noreferrer">
                        <img src={git_logo} className="logo github" alt="GitHub Logo" />
                    </a>
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                        <img src={react_logo} className="logo" alt="React Logo" />
                    </a>
                    <a href="https://openai.com" target="_blank" rel="noopener noreferrer">
                        <img src={openAI_logo} className="logo" alt="OpenAI Logo" />
                    </a>
                </div>

            </header>

            <div className="App-body">

                {loading && <p>Thinking...</p>} {/* Display loading message */}
                {answer && !loading && ( // Only show answer when not loading
                    <div>
                        <p>{answer}</p>
                    </div>
                )}


                {gameOver && ( // Display restart button when game is over
                    <div>
                        <p>Game Over! The word was "{currentWord}".</p>
                        <button onClick={restartGame}>Restart Game</button>
                    </div>
                )}

                <h3>Question Log:</h3>
                <ul type="1">
                    {questionLog.map((entry, index) => (
                        <li key={index}>
                            <strong>Q:</strong> {entry.question} <br />
                            <strong>A:</strong> {entry.answer}
                        </li>
                    ))}
                </ul>

                <div className="input-bar">                    
                    <button className="input-bar-button give-up">give up</button>
                    <button className="input-bar-button submit" onClick={handleSubmit}>submit</button>
                    <input
                        className="input-bar-textbox"
                        type="text"
                        placeholder="Type your question here..."
                        value={question}
                        onChange={handleInputChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit(); // Call handleSubmit when Enter is pressed
                            }
                        }}
                        disabled={loading || gameOver} // Disable input while loading
                    />
                    <h3 className='input-bar-counter'>{questionCount}/20</h3> {/* Display question count */}
                </div>

            </div>

        </div>
    );
}

export default App;