require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 6000;
const ip = process.env.SERVERIP || '127.0.0.1';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
    const { to, subject, body } = req.body;

    if (typeof to === "string" && typeof subject === "string" && typeof text === "string") {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAILID,
                pass: process.env.PASSKEY
            }
        });

        let mailOptions = {
            from: process.env.EMAILID,
            to: to,
            subject: subject,
            text: body
        };

        try {
            let info = await transporter.sendMail(mailOptions);
            res.status(200).send({ message: 'Email sent successfully', info: info });
        } catch (error) {
            res.status(500).send({ message: 'Failed to send email', error: error });
        }
    } else {
        res.status(400).json({ error: 'Required parameters missing' });
    }
});

app.post('/ping', async (req, res) => {
   res.status(200).send({ message: 'Pong!'});
});

app.listen(port, () => {
    console.log(`Email service listening at ${ip}:`);
});
