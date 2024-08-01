// importing package

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")

//define 
const app = express()
const port = 5000


//middlewares
app.use(cors())
app.use(bodyParser.json())

// MongoDB Connection
mongoose.connect('mongodb+srv://shauryaroy2004:R6he6B98QpyyogMe@cluster0.qe24xtj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


//SChema

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    }
})
const Email = mongoose.model('Email', emailSchema)

// POST Route for Subscribing Emails
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(201).json({ message: 'Successfully subscribed!' });
    } catch (error) {
        if (error.code === 11000) {
            // MongoDB duplicate key error
            res.status(400).json({ message: 'Email already subscribed.' });
        } else {
            res.status(500).json({ message: 'Error subscribing. Please try again.' });
        }
    }
});

// Starting the Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});