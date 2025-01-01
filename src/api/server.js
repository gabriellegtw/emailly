import express from 'express';
import emailRoute from './routes/emailRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the correct path to .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const app = express();

// Add CORS middleware to allow frontend requests
app.use(cors());

// Middleware 
app.use(express.json());

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Test endpoint
app.get('/', (req, res) => {
  res.send({
    status: "Started"
  })
});

app.use('/api', emailRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Log all registered routes
  console.log('\nRegistered Routes:');
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      console.log(`${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          console.log(`${Object.keys(handler.route.methods)} /api${handler.route.path}`);
        }
      });
    }
  });
});
