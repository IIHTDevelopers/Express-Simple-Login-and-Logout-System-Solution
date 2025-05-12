const bcrypt = require('bcrypt');
const { users } = require('../models/user');  // Assuming your users are stored in this file

module.exports = (req, res, next) => {
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }

    // Extract and decode the credentials from the Authorization header
    const base64Credentials = authHeader.split(' ')[1];
    const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = decodedCredentials.split(':');

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Find the user by username
    const user = users.find(u => u.email === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password1' });
    }

    // Compare the user-provided password with the stored hash
    bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
        if (err) {
            console.error('Error comparing password:', err);
            return;
        }

        if (isMatch) {
            console.log('Password is correct!');
        } else {
            console.log('Password is incorrect!');
        }

        next();
    });
};
