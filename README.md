# Twenty Questions Online

## Testing chat
[Convo #1](https://chatgpt.com/share/67ddade0-65ec-800b-b86c-bf9f91d6f78b)

### Find word
Ask chat to generate a word for twenty questions.

### Prompting
#### **Version 1**
```md
Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "_____". Answer based on the following rules:
1. Provide only yes or no answers
2. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "You question must have a yes or no answer, please ask another".

Question: "_________?"
```
[Testing](https://chatgpt.com/share/67ddb6b8-178c-800b-84ee-e2238b7d03b8) with random words and questions, searching for flaws and checking certain senarios.

### **Version 2**
Have the AI go through a checklist with the correct responses to certain types of input.
```md
Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "_____". Beforer answering, go through the following checks one at a time and in order 1 to 2:
1. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "You question must have a yes or no answer, please ask another".
2. If the question references the word itself. Respond with a yes/no followed by a hint that they are getting close.

Question: "_________?"
```
[Testing](https://chatgpt.com/share/67ddcfbb-7428-800b-9fde-a7f53b0c90b7) with random words and questions, searching for flaws and checking certain senarios.
Problem with rule 2. I ask if it is the word and it says "yes, your getting very close now!". Lol.

### **Version 3**
Small edits to check #2.
```md
Answer the question listed below like you are being asked questions in a game of twenty questions where your word is "_____". Before answering, go through the following checks one at a time and in order 1 to 3:
1. If the question does not have a reasonable yes or no answer or does not relate to the game. Respond with: "You question must have a yes or no answer, please ask another".
2. If the question references the word itself and is not guessing the word outright. Respond with a yes/no followed by a hint that they are getting close.
3. If the question guesses the word, using phasing along the lines of "is it x?" (where x is the word). Then Respond with "Yes! The word I was thinking of was x."

Question: "_________?"
```
[Testing](https://chatgpt.com/share/67ddd32c-e920-800b-88ea-7c040bcba3f6) with random words and questions, searching for flaws and checking certain senarios.
Problem with rule 2. I ask if it is the word and it says "yes, your getting very close now!". Lol.


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
