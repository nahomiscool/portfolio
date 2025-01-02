const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    const logMessage = `Name: ${name}, Email: ${email}, Message: ${message}\n`;

    fs.appendFile('messages.txt', logMessage, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Error saving message.');
        }
        console.log('Message saved to file');
        res.status(200).send('Message received!');
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});