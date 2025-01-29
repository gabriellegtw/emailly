import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';

// This is like a sub-router of express
const router = express.Router();

// middleware (express.json()) to parse content
// middleware have access to req and res
// middleware are functions that have access to rhe req and res
router.use(express.json());

// This is to test if the signup route is working
router.get('/testsignup', (req, res) => {
    res.send({ message: 'Email route is working' });
  });

// req is to send a request from the client to server (response from client)
// res is the response from the server

// Use async when you don't want other processes to be blocked while processing this
// Else, page would hang (eg. cannot press buttons) while this is taking place
// But sync process have overheads
router.post('/signup', async(req,res) => {
    console.log("sign up working")

    // This information is requested from the client
    const {email, password} = req.body;

    // $1 is a placeholder
    // The second argument is what replaces the placeholder
    // Need await because pool query is an async function so we need to wait for the result before proceeding
    const oldUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])

    // Check if a user with the email already exists
    // oldUser returns a promise so if (oldUser) will always return true as promises are truthy values
    if (oldUser.rows.length > 0) {
        return res.send({data: "Please log in instead"});
    }

    // Proceed with this if this is a new user
    try {
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create a new user, add to the table and return the newly inserted row
        // RETURNING * only returns the new row
        const newRow = await pool.query("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, encryptedPassword]
        )

        const newUser = newRow.rows[0];

        res.send({status: "ok", data: newUser})
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Oh no! Sign up failed" });
    }
});

export default router;