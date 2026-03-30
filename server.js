const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/openai', async (req, res) => {
    const prompt = req.body.prompt;
    const apiKey = process.env.OPENAI_API_KEY; // Make sure to set your OpenAI API key in environment variables

    try {
        const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            prompt: prompt,
            max_tokens: 100
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error with OpenAI API');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
