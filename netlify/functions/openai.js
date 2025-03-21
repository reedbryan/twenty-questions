const { OpenAI } = require('openai');

exports.handler = async (event) => {
    const { userInput } = JSON.parse(event.body);

    if (!userInput) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'User input is required' }),
        };
    }

    // Check if the API key is available
    if (!process.env.OPENAI_API_KEY) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'The OPENAI_API_KEY environment variable is missing or empty.' }),
        };
    }

    try {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: 'o1-mini-2024-09-12',
            messages: [{ role: 'user', content: userInput }],
            max_completion_tokens: 10000,
        });

        /*    
        console.log("Line 32: " + JSON.stringify(completion));
        console.log("Line 32: " + JSON.stringify(completion.usage[2]));
        console.log("Line 33: " +JSON.stringify(completion.choices[0].message.content.trim()));
        */

        return {
            statusCode: 200,
            body: JSON.stringify({ response: completion.choices[0].message.content.trim() }),
        };
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch response from OpenAI.' }),
        };
    }
};