const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

//CORS
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NiimA@1960@',
    database: 'music_player'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Database connected!');
});

// Secret key for JWT
const JWT_SECRET = "48e8b823e931f4b6a148d1bbc4aa507f8dba1a81ca59aaf12953c036b20d20792ccab757ed068b03492c9e38732e9b00913e99c5bab61cf30210c4ccdd12d39e";

// API Routes

app.post('/CA', async (req, res) => {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const query = `INSERT INTO users (email, password) VALUES (?, ?)`;
    db.query(query, [email, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username or email already exists!' });
            }
            return res.status(500).json({ message: 'Database error!' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = `SELECT * FROM users WHERE email = ?`;
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: 'Database error!' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password!' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token });
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
