import { BardAPI } from 'bard-api-node';
import express from 'express';

// This is like a sub-router of express
const router = express.Router();

// middleware (express.json()) to parse content
// middleware have access to req and res
// middleware are functions that have access to rhe req and res
router.use(express.json());

// This is to test if the email route is working
router.get('/test', (req, res) => {
    res.send({ message: 'Email route is working' });
  });

// req is to send a request from the client to server
// res is the response from the server

// Use async when you don't want other processes to be blocked while processing this
// Else, page would hang (eg. cannot press buttons) while this is taking place
// But sync process have overheads
router.post('/formalize', async(req,res) => {
    try {
        // Initialize Bard with the API key
        const bard = new BardAPI();
        console.log('BARD_API_KEY:', process.env.BARD_API_KEY);
        bard.initializeChat(process.env.BARD_API_KEY);

        console.log('Request received:', req.body);
        const rawContent = req.body.content;

        if (!rawContent) {
            return res.status(400).json({ message: "No content provided" });
        }

        console.log('Calling Bard with content:', rawContent);

        const formalisedEmail = await bard.getBardResponse(`Make this email sound more formal: ${rawContent}`);
        console.log('Bard response:', formalisedEmail);

        res.status(200).send(formalisedEmail);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Oh no! Email formalization failed" });
    }
});

export default router;
