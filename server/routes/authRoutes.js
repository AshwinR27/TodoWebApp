const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });
};


router.post('/auth', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            if (!name) {
                return res.status(400).json({ message: 'User not found, please register' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            user = await User.create({
                name,
                email,
                password: hashedPassword,
            });

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
