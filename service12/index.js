// require('dotenv').config({ path: './.env' });   // ⛔ इसे comment कर दो

const express = require('express');
const mongoose = require('mongoose');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();
const PORT = 3000;

// ⛔ Don't load from process.env temporarily
const LOCAL_MONGO_URI = 'mongodb://localhost:27017/feedbackdb';

console.log('📦 MONGO_URI:', LOCAL_MONGO_URI);

app.use(express.json());
app.use('/api/feedback', feedbackRoutes);

mongoose.connect(LOCAL_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to Local MongoDB');
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
});
