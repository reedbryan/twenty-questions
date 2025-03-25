# Twenty Questions Online

A platform to play a game of twenty questions against AI. [Click to Play](https://twenty-questions-online.netlify.app/)

## Table of Contents
- [Prompting](#prompting)
  - [Testing Chat](#testing-chat)
    - [Version 1](#version-1)
    - [Version 2](#version-2)
    - [Version 3](#version-3)
  - [Find Word](#find-word)
- [OpenAI API](#openai-api)
  - [Implementation](#implementation)
  - [Security](#security)
  - [Usage](#usage)
- [UI/UX](#uiux)
  - [Chat Messaging Display](#chat-messaging-display)
  - [Loading State](#loading-state)
  - [Buttons and Input](#buttons-and-input)
  - [Game Over State](#game-over-state)

## Prompting
The prompts sent to the AI for formatted specifically for their purpose as questions in a game of twenty questions. The prompt inputs the user's question and the word they are trying to guess, including contraints for the AI to follow as well as options for what to respond with in special cases. These guidelines were formed through and iterative process, outlined below.

### **Testing chat**
Very eary in developement, I decided  that I would use GPTo1-mini for this application given the price of API access for models like GPT4 or GPT3o-mini. Before implementing anything I wanted to ensure that o1-mini would be able to generate acceptable answers to questions. See [Inital testing convo](https://chatgpt.com/share/67ddade0-65ec-800b-b86c-bf9f91d6f78b) for my initial questions to o1-mini. I quickly found that o1-mini was up to the task so I next started testing out prompt structures to try and optimize the accuracy and coherence of the response.

#### **Version 1**
The first iteration of the prompt:
```md
Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "_____". Answer based on the following rules:
1. Provide only yes or no answers
2. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "You question must have a yes or no answer, please ask another".

Question: "_________?"
```
I tested this prompt with random words and questions, searching for flaws and checking certain senarios (See [V1 convo](https://chatgpt.com/share/67ddb6b8-178c-800b-84ee-e2238b7d03b8)).

#### **Version 2**
After analyzing the responses from V1 I changed the prompt, having the AI go through a checklist with the desired responses to different types of user input.
```md
Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "_____". Beforer answering, go through the following checks one at a time and in order 1 to 2:
1. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "You question must have a yes or no answer, please ask another".
2. If the question references the word itself. Respond with a yes/no followed by a hint that they are getting close.

Question: "_________?"
```
I found a problem with rule #2. I give it correct answer and instead of ending the game it says "yes, your getting very close now!". This is bad (See [V2 convo](https://chatgpt.com/share/67ddcfbb-7428-800b-9fde-a7f53b0c90b7)). 

#### **Version 3**
Small edits to rule #2, addition of rule #3.
```md
Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "_____". Before answering, go through the following checks one at a time and in order 1 to 3:
1. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "You question must have a yes or no answer, please ask another".
2. If the question references the word itself and is not guessing the word outright. Respond with a yes/no followed by a hint that they are getting close.
3. If the question guesses the word, using phasing along the lines of "is it x?" (where x is the word). Then Respond with "Yes! The word I was thinking of was x."

Question: "_________?"
```
This verison works OK so I kept it for a the majority of development (See [V3 convo](https://chatgpt.com/share/67ddd32c-e920-800b-88ea-7c040bcba3f6)).

#### **Version 4**
After some development I added more contraints to problems I found and edited the prompt structure to fit with the [prompt.js](https://github.com/reedbryan/twenty-questions/blob/main/src/prompt.js) script that I use for formatting the message sent to the API. That version looked something like this:
```js
export const formatQuestion = (userInput, currentWord) => {
    if (!userInput || !currentWord) {
        throw new Error('Both userInput and currentWord are required to format the question.');
    }
    
    const rules = `
    1. If the question is not a question, respond with "That is not a question."
    2. If the question does not have a reasonable yes or no answer or does not relate to the game, respond with: "Your question must have a yes or no answer, please ask another."
    3. If the question references the word itself and is not guessing the word outright, respond with a yes/no followed by a hint that they are getting close.
    4. If the question guesses the word, using phrasing along the lines of "is it x?" (where x is the word), then respond with EXACTLY: "Yes! The word I was thinking of was x."
    5. If none of the above apply, respond with only a yes/no followed by the initial question. Example: Question: "is it alive" Responses: "Yes. It is alive.", "No. It is not alive."
    `;
    
    return `Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "${currentWord}". Before answering, go through the following checks one at a time and in order:
    ${rules}
    
    Question: "${userInput}?"`;
};
```

## OpenAI API
The OpenAI API is a powerful tool that enables this application to generate and answer questions for a game of twenty questions. It is implemented using Netlify's [serverless functions](https://docs.netlify.com/functions/overview/), ensuring secure and efficient communication with the API.

### **Security**
The API key is stored an [environment variable](https://docs.netlify.com/environment-variables/overview/) hosted by Netlify. This ensures that the key is not exposed in the client-side code, making it a secure method for accessing the API in a server-side application.

### **Implementation**
The API is accessed via the openai package in the openai.js file. The function takes user input, sends it to the OpenAI API, and returns the response. Here's an example of how the API is called:
```js
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
    model: 'o1-mini-2024-09-12',
    messages: [{ role: 'user', content: userInput }],
    max_completion_tokens: 10000,
});
```

### **Usage**
The fetchAIResponse function in prompt.js handles communication with the serverless function. It formats the prompt, sends it to the server, and processes the response:
```js
export const fetchAIResponse = async (formattedPrompt) => {
    const response = await fetch('/.netlify/functions/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: formattedPrompt }),
    });

    const data = await response.json();
    return data.response;
};
```

## UI/UX
The user interface and experience are designed to make the game intuitive and engaging. Key components include the chat messaging display, loading state, and interactive buttons.

### **Chat Messaging Display**
The chat log displays the history of questions and answers in a scrollable area. Each message is styled as a "bubble" for clarity:
```js
<div className="chat" ref={chatRef}>
    {chatLog.map((entry, index) => (
        <div key={index} className="message-container">
            {entry.question && (
                <div className="message-bubble question">
                    <strong>Q:</strong> {entry.question}
                </div>
            )}
            <div className="message-bubble answer">
                <strong>A:</strong> {entry.answer}
            </div>
        </div>
    ))}
</div>
```

### **Loading State**
A loading indicator is displayed while waiting for the AI's response. This provides feedback to the user and improves the overall experience:

### **Buttons and Input**
The input bar includes a text box for typing questions, a "Submit" button, and a "Give Up" button. The question count is displayed to track progress:
```js 
<div className="input-bar">
    <button className="input-bar-button give-up">Give Up</button>
    <button className="input-bar-button submit" onClick={handleSubmit}>Submit</button>
    <input
        className="input-bar-textbox"
        type="text"
        placeholder="Type your question here..."
        value={question}
        onChange={handleInputChange}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        }}
        disabled={loading || gameOver}
    />
    <h3 className="input-bar-counter">{questionCount}/20</h3>
</div>
```

### **Game Over State**
When the game ends, a message is displayed with the correct word, and a "Restart Game" button allows the user to play again:
```js
{gameOver && (
    <div>
        <p>Game Over! The word was "{currentWord}".</p>
        <button onClick={restartGame}>Restart Game</button>
    </div>
)}
```
These features combine to create a seamless and enjoyable user experience for playing twenty questions online.