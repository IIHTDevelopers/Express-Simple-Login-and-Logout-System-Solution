const bcrypt = require('bcrypt');
const { users } = require('../models/user');

// User registration
exports.registerUser = (req, res) => {
    const { name, email, password, age } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        // Save new user (in-memory for now)
        const newUser = { id: users.length + 1, name, email, passwordHash: hashedPassword, age };
        users.push(newUser);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    });
};
