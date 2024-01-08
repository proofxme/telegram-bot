const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3030; // Port where the server will listen

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const telegramBotToken = process.env.TELEGRAM_TOKEN;
const telegramApiUrl = `https://api.telegram.org/${telegramBotToken}`;

app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Endpoint for Telegram webhook
app.post('/', (req, res) => {
    const message = req.body.message || req.body.edited_message;

    if (message) {
        console.log('Received Message:', message);

        // Responding to Telegram to acknowledge receipt of the message
        res.status(200).send();
    } else {
        res.status(400).send('No message received');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    // Set the webhook URL
    const webhookUrl = process.env.NGROCK_URL; // Replace with your public URL
    axios.post(`${telegramApiUrl}/setWebhook`, { url: webhookUrl })
        .then(response => {
            console.log('Webhook set successfully:', response.data);
        })
        .catch(error => {
            console.error('Error setting webhook:', error);
        });
});