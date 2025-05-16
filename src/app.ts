import express from 'express';
const emailController = require('./controllers/emailController');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
    console.log("Server is healthy");
})

app.post('/post', emailController);

app.listen(5000, () => {
    console.log("server running on port 5000")
})

