const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 👇 Your USSD endpoint
app.post('/ussd', (req, res) => {
    // ✅ Log the entire request body to the terminal
    console.log(req.body); 

    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    let response = '';

    if (text == '1') {
        response = `CON Select what you want \n`;
        response += `1. Fish and chips \n`;
        response += `2. Water and Juice`;
    } else if (text == '2') {
        response = `CON Hitamo icyo ushaka \n`;
        response += `1. Amafi n'amafiriti \n`;
        response += `2. Amazi n'imitobe`;
    } else if (text == '3') {
        response = `END Your phone number is ${phoneNumber}`;
    } else if (text == '1*1') {
        const accountNumber = 'ACC100101';
        response = `END Your account number is ${accountNumber}`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

// ✅ Run your app on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 USSD app running on http://localhost:${PORT}`);
});
