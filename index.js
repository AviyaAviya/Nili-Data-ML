
require('dotenv').config();
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
const Donation = require('./models/Donation.js'); // Example: Donation model
const Volunteering = require('./models/Volunteering.js'); // Example: Volunteering model


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
    //console.log(error)
    if (error.code === '23505') {
      // Unique violation error code in PostgreSQL
      res.status(400).json({ error: 'Username already exists!' });
    }
    else { res.status(500).json({ error: 'Database error' }); }
    res.status(500).json({ error: 'Database error' });
  }
});

const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';  // Store this securely, e.g., in an environment variable

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

    const match = await bcrypt.compare(password, user.password);
    console.log(password);
    console.log(user.password);
    console.log(match);

    if (!match) {
    //if (password !=user.password) {
      
      return res.status(400).json({ error: 'Invalid password!' });
    }

    // Generate a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', token: token, username: user.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get('/authenticate', authenticateJWT, (req, res) => {
  res.status(200).json({ username: req.user.username });
});


app.get('/user/:username/profile', authenticateJWT, async (req, res) => {
  const { username } = req.params;

  if (req.user.username !== username) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const userProfileResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userProfileResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user_profile = userProfileResult.rows[0];

    const donationHistoryResult = await pool.query('SELECT * FROM donation_history WHERE username = $1', [username]);
    const volunteeringHistoryResult = await pool.query('SELECT * FROM volunteering_history WHERE username = $1', [username]);

    const donation_history = donationHistoryResult.rows;
    const volunteering_history = volunteeringHistoryResult.rows;

    res.status(200).json({
      user_profile,
      donation_history,
      volunteering_history
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});


app.post('/user/:username/profile', authenticateJWT, async (req, res) => {
  const { username } = req.params;
  const { place, type, date, amountOfMoney } = req.body;

  if (req.user.username !== username) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const userProfileResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userProfileResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (type === 'donation') {
      await pool.query('INSERT INTO donation_history (username, place, date, amount_of_money) VALUES ($1, $2, $3, $4)', [username, place, date, amountOfMoney]);
    } else if (type === 'volunteering') {
      await pool.query('INSERT INTO volunteering_history (username, place, date) VALUES ($1, $2, $3)', [username, place, date]);
    }

    res.status(201).json({ message: 'New activity added successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/:username/donations', async (req, res) => {
  const { username } = req.params;
  try {
    const donations = await Donation.find({ username });
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch volunteer activities by username
app.get('/:username/volunteerings', async (req, res) => {
  const { username } = req.params;
  try {
    const volunteerings = await Volunteering.find({ username });
    res.json(volunteerings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});