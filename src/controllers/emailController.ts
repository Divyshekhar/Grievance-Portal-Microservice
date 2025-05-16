import { Request, Response } from "express";
const nodemailer = require('nodemailer');
require('dotenv').config();

const emailController = async (req: Request, res: Response) => {
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

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Email failed to send', error: error });
    }
};

module.exports = emailController;