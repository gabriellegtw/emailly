import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables first, before any other imports
dotenv.config();

// Now import routes after environment variables are loaded
import emailRoute from './routes/emailRoute.js';
import signUpRoute from './routes/signUpRoute.js';
import loginRoute from './routes/logInRoute.js';
import saveEmailRoute from './routes/saveEmailRoute.js';
import fetchEmailsRoute from './routes/fetchEmailsRoute.js';
import deleteEmailRoute from './routes/deleteEmailRoute.js';

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
app.get('/', async (req, res) => {
  res.send({
    status: "Started"
  })
});

// api for making the email formal through gemini
app.use('/api', emailRoute);

app.use('/api', signUpRoute);

app.use('/api', loginRoute);

// api for saving email drafts
app.use('/api', saveEmailRoute);

// api for fetching all emails associated with a user
app.use('/api', fetchEmailsRoute);

// api for deleting an email
app.use('/api', deleteEmailRoute);

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
