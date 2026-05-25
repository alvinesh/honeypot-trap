const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware to parse incoming login attempts
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The Ledger: Where we record the attackers
const LOG_FILE = path.join(__dirname, 'intruders.log');

// 1. The Fake Login Route
app.post('/admin/login', (req, res) => {
    // Extract the attacker's data
    const attackerIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent']; // Gets their browser/bot info
    const guessedUsername = req.body.username || 'UNKNOWN';
    const guessedPassword = req.body.password || 'UNKNOWN';

    // 2. Format the Threat Intelligence Data
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] 🚨 INTRUDER ALERT 
    IP: ${attackerIP} 
    Tool/Browser: ${userAgent} 
    Attempted Username: ${guessedUsername} 
    Attempted Password: ${guessedPassword}\n\n`;

    // 3. Silently write to the ledger
    fs.appendFileSync(LOG_FILE, logEntry);

    // 4. The Deception: Always give a generic failure message to keep them guessing
    console.log(`⚠️ Blocked login attempt from ${attackerIP}`);
    
    // We add an artificial 2-second delay to slow down automated bots (Tarpitting)
    setTimeout(() => {
        res.status(401).json({ error: "Invalid username or password. This incident has been logged." });
    }, 2000);
});

app.listen(PORT, () => {
    console.log(`🍯 Honeypot Admin Portal active on port ${PORT}... waiting for attackers.`);
});