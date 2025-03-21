export const formatPrompt = (userInput, currentWord) => {
    return `Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "${currentWord}". Before answering, go through the following checks one at a time and in order 1 to 3:
1. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "Your question must have a yes or no answer, please ask another".
2. If the question references the word itself and is not guessing the word outright. Respond with a yes/no followed by a hint that they are getting close.
3. If the question guesses the word, using phrasing along the lines of "is it x?" (where x is the word). Then Respond with "Yes! The word I was thinking of was x."

Question: "${userInput}?"`;
};
