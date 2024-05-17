const bcrypt = require('bcrypt');
const Users = require('../models/index.models').User;
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = require("../middlewares/auth.middlewares");

// Function to handle user registration (sign up)
exports.UserSignUp = (req, res) => {
    const { username, email, password } = req.body;
    // Validate email format
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if the username or email already exists
    Users.findOne({
        where: {
            [Op.or]: [
                { Username: username },
                { Email: email }
            ]
        }
    }).then(existingUser => {
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }

        // Hash the password securely
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
            // Create a new user record
            Users.create({
                Username: username,
                Email: email,
                Password: hashedPassword
            })
            .then(newUser => {
                // Respond with success message
                res.status(200).json({ message: 'User signed up successfully' });
            })
            .catch(error => {
                console.error('Error creating user:', error);
                res.status(500).json({ error: 'Internal server error' });
            });
        })
        .catch(error => {
            console.error('Error hashing password:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
    })
    .catch(error => {
        console.error('Error finding existing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};

// Function to handle user login (sign in)
exports.UserSignIn = (req, res) => {
    const { identifier, password } = req.body;

    // Find the user by username or email
    Users.findOne({ where: { 
        [Op.or]: [
            { Username: identifier },
            { Email: identifier }
        ]
    }})
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Invalid username/email or password' });
        }

        // Check if the password matches
        bcrypt.compare(password, user.Password)
        .then(passwordMatch => {
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid username/email or password' });
            }
            const userId = user.user_ID;
            // Generate JWT token
            const token = jwt.sign({ userId: userId }, jwtSecret, { expiresIn: '1h' });

            // Respond with success message and token
            res.status(200).json({ message: 'Login successful', token });
        }).catch(error => {
            console.error('Error comparing passwords:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
    }).catch(error => {
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};

exports.GetUserData = (req, res) => {
    // Get user ID from the token
    const userId = req.userId;

    // Retrieve user data from the database
    Users.findByPk(userId, { attributes: ['Username', 'Email'] })
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with user data
        res.status(200).json({ user });
    })
    .catch(error => {
        console.error('Error getting user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
};
exports.UserLogout = (req, res) => {
    const token = req.header('Authorization').substring(7); // Extract token

    // Blacklist the token
    authMiddleware.blacklistToken(token);

    res.status(200).json({ message: 'Logout successful' });
};

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
