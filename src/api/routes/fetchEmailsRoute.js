import express from 'express';
import pool from '../db.js';
import dotenv from 'dotenv';  

// Load environment variables
dotenv.config();

// This is like a sub-router of express
const router = express.Router();

// middleware (express.json()) to parse content
// middleware have access to req and res
// middleware are functions that have access to rhe req and res
router.use(express.json());

// req is to send a request from the client to server (response from client)
// res is the response from the server

// Use async when you don't want other processes to be blocked while processing this
// Else, page would hang (eg. cannot press buttons) while this is taking place
// But sync process have overheads

// This is a post and not get because you need to send over the email of the current user. If you use get, you need to put the email in the url which is unsafe
router.post('/fetchEmails', async(req,res) => {
    console.log("fetch emails working")

    try {
        // This information is requested from the client
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'No email entered' });
        }

        // Check if the email exists and belongs to the user (if logged in)
        // $1 is a placeholder
        // The second argument is what replaces the placeholder
        // Need await because pool query is an async function so we need to wait for the result before proceeding
        const allEmails = await pool.query(
            'SELECT * FROM emails WHERE user_email = $1',
            [email]
        );

        // When you send back a response, the arguments need to have a property so you can reference it (eg. "rows:")
        return res.json({ 
            message: 'Emails fetched',
            rows: allEmails.rows 
        });
    } catch (error) {
        console.log("Error in fetching emails: ", error.message)
        res.status(500).json({ error: 'Server error' });
    }

});

export default router;