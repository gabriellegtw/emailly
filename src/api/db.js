import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

// Load env vars if not already loaded
dotenv.config();

// Add more detailed debug logging
console.log('Environment variables:');
console.log('Available environment variables:', Object.keys(process.env));
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Is DATABASE_URL defined:', !!process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use connection string
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false, // Required for Render
});

    // Add an error listener to help debug
    pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    });

    // Validate database URL
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not defined in environment');
      process.exit(1);
    }

    // Test the connection immediately
    (async () => {
        try {
            const result = await pool.query('SELECT NOW()');
            console.log('Database connection successful:', result.rows[0]);
        } catch (err) {
            console.error('Database connection error:', err.message);
            console.error('Connection details:', {
                ssl: process.env.NODE_ENV === "production",
                nodeEnv: process.env.NODE_ENV,
                hasDbUrl: !!process.env.DATABASE_URL
            });
        }
    })();

// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
// });

export default pool;