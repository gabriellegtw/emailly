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
// log in is post because it involves sending over sensitive information
router.post('/save', async(req,res) => {
    console.log("save working")

    try {
        // This information is requested from the client
        const {email_id, user_email, content} = req.body;

        if (!content) {
            return res.status(400).json({ error: 'Email content is required' });
        }

        if (email_id) {
            // Check if the email exists and belongs to the user (if logged in)
            // $1 is a placeholder
            // The second argument is what replaces the placeholder
            // Need await because pool query is an async function so we need to wait for the result before proceeding
            const email = await pool.query(
                'SELECT * FROM emails WHERE email_id = $1 AND user_email = $2',
                [email_id, user_email]
            );

            if (email.rows.length === 0) {
                return res.status(404).json({ error: 'Email not found or unauthorized' });
            }

            // Update the email
            await pool.query(
                'UPDATE emails SET content = $1, updated_at = NOW() WHERE email_id = $2',
                [content, email_id]
            );

            return res.json({ message: 'Email updated', email_id });
        } else {
            // If the email is new
            // Email id is automatically generated and you do not need to manually assign it
            const newEmail = await pool.query(
                'INSERT INTO emails (user_email, content, created_at) VALUES ($1, $2, NOW()) RETURNING email_id',
                [user_email, content]
            );

            return res.json({ message: 'Email saved', email_id: newEmail.rows[0].email_id });
        }
    } catch (error) {
        console.log("Error in save: ", error.message)
        res.status(500).json({ error: 'Server error' });
    }

});

export default router;