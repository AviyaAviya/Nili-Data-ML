
const corsOptions = {
  origin: 'http://localhost:3000',
};

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors(corsOptions));

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '123456',  // 123456
  port: 5432,
});

// Define an endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);  // 10 is the salt rounds

    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]  // Use hashed password
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    // maybe to add logic to catch diffrent excepetions
    //console.log(error)
    if (error.code === '23505') {
      // Unique violation error code in PostgreSQL
      res.status(400).json({ error: 'Username already exists!' });
    }
    else { res.status(500).json({ error: 'Database error' }); }
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid username' });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    console.log(password)
    console.log(user.password)
    //console.log(match)
    //if (password !== user.password) {
      if (!match) {
      return res.status(400).json({ error: 'Invalid password!' });
    }



    // Passwords match
    res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});