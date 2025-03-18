const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
});

// Get user by ID
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
});

// Update user
router.put('/:id', async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true }).select('-password');
    res.json(user);
});

// Delete user
router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
});

module.exports = router;
