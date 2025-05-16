"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailController = require('./controllers/emailController');
const cors = require('cors');
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.get('/health', (req, res) => {
    console.log("Server is healthy");
    res.status(200).send('OK');
});
app.post('/post', emailController);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
