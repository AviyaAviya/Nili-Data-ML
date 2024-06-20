// Import the 'pg' package
const { Pool } = require('pg');

// Database connection configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'users',
  password: '123456',
  port: '5432', // Default PostgreSQL port
});

// Export the database connection pool
module.exports = pool;
