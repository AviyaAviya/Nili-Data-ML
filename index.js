const corsOptions = {
    origin: 'http://localhost:3000',
  };
  
  app.use(cors(corsOptions));
  
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Configure middleware
app.use(cors());
app.use(bodyParser.json());

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'postgres', 
  host: 'localhost', 
  database: 'users', 
  password: '123456', 
  port: 5432, 
});

// Define an endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required!' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
