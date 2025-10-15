const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
require('dotenv').config(); // 👈 Importante

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000" // o http://localhost:5173 si usas Vite
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('❌ Error connecting to database', err);
});

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('users', UserSchema);

// Routes
app.get("/", (req, resp) => {
    resp.send("App is working");
});

app.post("/register", async (req, resp) => {
    try {
        const user = new User(req.body);
        let result = await user.save();
        if (result) {
            resp.status(201).send(result);
        } else {
            resp.status(400).send("User not created");
        }
    } catch (e) {
        resp.status(500).send({ message: "Something went wrong", error: e.message });
    }
});

// Start server
app.listen(5000, () => {
    console.log("🚀 App is running on port 5000");
});
