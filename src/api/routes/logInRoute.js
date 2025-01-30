import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  // Import dotenv if not already imported

// Load environment variables
dotenv.config();

// This is like a sub-router of express
const router = express.Router();

// middleware (express.json()) to parse content
// middleware have access to req and res
// middleware are functions that have access to rhe req and res
router.use(express.json());

// This is to test if the login route is working
router.get('/testlogin', (req, res) => {
    res.send({ message: 'Email route is working' });
  });

// req is to send a request from the client to server (response from client)
// res is the response from the server

// Use async when you don't want other processes to be blocked while processing this
// Else, page would hang (eg. cannot press buttons) while this is taking place
// But sync process have overheads
// log in is post because it involves sending over sensitive information
router.post('/login', async(req,res) => {
    console.log("login working")

    // This information is requested from the client
    const {email, password} = req.body;

    // $1 is a placeholder
    // The second argument is what replaces the placeholder
    // Need await because pool query is an async function so we need to wait for the result before proceeding
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    // Check if a user with the email does not exist, and prompt to sign up if it does not exist
    if (user.rows.length < 1) {
        return res.send({data: "No account found. Please sign up instead"});
    }

    try {
        // Get the first user object from the user variable
        // user is just a promise object
        const foundUser = user.rows[0];
        // If password is correct
        if (await bcrypt.compare(password, foundUser.password)) {
            const token = jwt.sign({email:foundUser.email}, process.env.JWT_SECRET);
            res.send({status: "ok", data: user, token})
        } else {
            return res.send({data: "Oops, wrong password"});
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Oh no! Login failed" });
    }
});

export default router;