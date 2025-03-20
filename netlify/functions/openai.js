// filepath: /Users/reedbryan/Documents/WebDev/react/twenty-questions/netlify/functions/openai.js
const { OpenAI } = require('openai');

exports.handler = async (event) => {
  const { userInput } = JSON.parse(event.body);

  if (!userInput) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'User input is required' }),
    };
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userInput }],
      max_tokens: 100,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ response: completion.choices[0].message.content.trim() }),
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch response from OpenAI' }),
    };
  }
};