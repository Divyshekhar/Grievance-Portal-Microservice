"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require('nodemailer');
require('dotenv').config();
const emailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problem, solution } = req.body;
    if (!problem || !solution) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.TO_EMAIL,
            subject: `New Problem Submission`,
            text: `Hi Divyshekhar\n\nThis is to inform you that your girlfriend has submitted a new Greivance. \n You should probably Look into it.\n\n Problem: ${problem}\n\nSolution: ${solution}\n\n Best Regard\nGreivance Portal`,
        };
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Email failed to send', error: error });
    }
});
module.exports = emailController;
