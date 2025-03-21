export const formatQuestion = (userInput, currentWord) => {
    return `Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "${currentWord}". Before answering, go through the following checks one at a time and in order 1 to 6:
1. If the question is not a question, respond with "That is not a question. 
2. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "Your question must have a yes or no answer, please ask another".
3. If the question references the word itself and is not guessing the word outright. Respond with a yes/no followed by a hint that they are getting close.
4. If the question guesses the word, using phrasing along the lines of "is it x?" (where x is the word). Then Respond with EXACTLY: "Yes! The word I was thinking of was x."
6. If None of the above apply, respond with only a yes/no followed by the initial question. Example: Question: "is it alive" "Yes. It is alive."


Question: "${userInput}?"`;
};

export const formatInitial = () => {
    return `Generate a word for a game of twenty questions. Don't make the word too obscure. Return only the word you generated.`;
};
