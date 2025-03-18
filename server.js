require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Test Route
app.get('/', (req, res) => {
    res.send('Hello, Backend is running!');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.use('/auth', require('./routes/auth'));

app.use('/users', require('./routes/users'));


const cron = require('node-cron');
const User = require('./models/User');

// Run every midnight
cron.schedule('0 0 * * *', async () => {
    console.log('Running daily cleanup job...');

    try {
        await User.deleteMany({ email: /@test.com$/ });
        console.log('Deleted test accounts');
    } catch (err) {
        console.error(err);
    }
});
