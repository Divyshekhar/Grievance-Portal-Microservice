import express from 'express';
const emailController = require('./controllers/emailController');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/health', (req, res)=> {
    console.log("Server is healthy");
})

app.post('/post', emailController);
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

