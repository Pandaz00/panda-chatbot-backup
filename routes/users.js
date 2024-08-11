const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

//user register
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const pool = req.app.get('pool');
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).send({ message: 'Encryption error' });
        }
        pool.query('INSERT INTO users(username, password) VALUES(?, ?)', [username, hash], (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send({ message: 'Database operation failed' });
            }
            res.send({ message: "User registered", UserId: result.insertId });
        });
    });
});


//AUthenticate User

router.post('/signin', (req, res) => {
    const { username, password } = req.body;
    const pool = req.app.get('pool');

    pool.query('SELECT * FROM users WHERE username = ?', [username], (error, results) => {
        if (error) throw error;

        if (results.length === 0) {
            return res.status(401).send({ message: 'Authentication failed' });
        }

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ success: true, message: 'Logged in successfully', token: token });
            } else {
                res.status(401).send({ message: 'Authentication failed' });
            }
        });
    });
});

//update on may 20,explore about saving user's chat history

function authenticateToken(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Token is invalid' });
        }
        req.user = user;
    });
}
router.post('/save-chat', authenticateToken, (req, res) => {
    const { userId, userMessage, botResponse } = req.body;
    const sql = 'INSERT INTO ChatHistory (UserID, Timestamp, UserMessage, BotResponse) VALUES (?, NOW(), ?, ?)';
    pool.query(sql, [userId, userMessage, botResponse], (err, result) => {
        if (err) {
            console.error('Failed to save chat history:', err);
            return res.status(500).send('Failed to save chat history');
        }
        res.send('Chat history saved successfully');
    });
});




module.exports = router;



