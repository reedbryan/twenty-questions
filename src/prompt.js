export const formatQuestion = (userInput, currentWord) => {
    if (!userInput || !currentWord) {
        throw new Error('Both userInput and currentWord are required to format the question.');
    }
    
    const rules = `
    1. If the question is not acually a question, respond with "That is not a question."
    2. If the question does not have a reasonable yes or no answer or does not relate to the game, respond with: "Your question must have a yes or no answer, please ask another."
    3. If the question references the word itself but is not guessing the word outright, respond with a yes/no followed by a hint that they are getting close.
    4. If the question guesses the word, using phrasing along the lines of "is it x?" (where x is the word), then respond with EXACTLY: "Yes! The word I was thinking of was x."
    5. If none of the above apply, respond with only a yes/no.
    `;
    
    return `Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "${currentWord}". Before answering, go through the following checks one at a time and in order:
    ${rules}
    
    Question: "${userInput}?"`;
};

export const formatInitial = () => {
    return `Generate a word for a game of twenty questions. Don't make the word too obscure but make it unique. Return only the word you generated.`;
};

export const fetchAIResponse = async (formattedPrompt) => {
    try {
        const response = await fetch('/.netlify/functions/openai', { // call API from serverless function
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
        return data.response; // Return the AI's response
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
};