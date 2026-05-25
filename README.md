# 🍯 GovSOC Honeypot Trap (Deception Tech)

A Node.js/Express deception tool designed to capture automated brute-force attacks. This API simulates an exposed Admin Login portal to lure malicious actors, silently logging their network footprint while employing tarpitting to slow down automated botnets.

## 🚀 Features
* **Threat Logging:** Captures attacker IP, User-Agent, and guessed credentials, writing them to a localized `intruders.log` ledger.
* **Tarpitting (Rate Limiting):** Introduces artificial latency (2000ms delay) on failed login attempts to mathematically cripple brute-force dictionaries.
* **Silent Failure:** Returns generic 401 Unauthorized responses to keep attackers completely unaware they are in a sandbox.

## ⚙️ Usage
1. Clone the repo and run `npm install`.
2. Start the honeypot: `node server.js`
3. Simulate an attack (CLI):
   ```bash
   curl -X POST -d "username=admin" -d "password=password123" http://localhost:3001/admin/login
