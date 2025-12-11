require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.'));

// --- MONGODB CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// --- DEFINE SCHEMA & MODEL ---
const capsuleSchema = new mongoose.Schema({
    title: String,
    content: String,
    openDate: Date,
    createdAt: { type: Date, default: Date.now }
});

const Capsule = mongoose.model('Capsule', capsuleSchema);

// --- HELPER ---
const isUnlocked = (openDate) => {
    return new Date() >= new Date(openDate);
};

// --- ROUTES ---

// 1. GET all capsules
app.get('/api/capsules', async (req, res) => {
    try {
        const capsules = await Capsule.find().sort({ createdAt: -1 }); // Newest first

        const safeCapsules = capsules.map(cap => {
            const unlocked = isUnlocked(cap.openDate);
            return {
                id: cap._id, // Map MongoDB's '_id' to our frontend's 'id'
                title: cap.title,
                openDate: cap.openDate,
                // Hide content if locked
                content: unlocked ? cap.content : "🔒 This capsule is locked until " + new Date(cap.openDate).toLocaleString(),
                isLocked: !unlocked
            };
        });
        res.json(safeCapsules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. POST a new capsule
app.post('/api/capsules', async (req, res) => {
    const { title, content, openDate } = req.body;

    if (!title || !content || !openDate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newCapsule = await Capsule.create({
            title,
            content,
            openDate
        });
        res.status(201).json({ message: "Capsule buried!", capsule: newCapsule });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. DELETE a capsule
app.delete('/api/capsules/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Capsule.findByIdAndDelete(id);
        res.json({ message: "Capsule deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`⏳ Time Capsule Server running on http://localhost:${PORT}`);
});