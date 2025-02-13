const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { signupSchema } = require('../validators/auth-validator.js');
const JWT_SECRET = "nvhiuuf932u9v"



const signup = async (req, res) => {
    // Validate request body
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: 409, message: 'User with this email already exists.' });
        }

        // Hash password before saving
        const hashedPassword = bcrypt.hashSync(password, 10);

        
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        
        const token = jwt.sign(
            { id: newUser._id, username: newUser.username },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        
        return res.status(201).json({
            status: 201,
            message: 'User created successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            token
        });

    } catch (err) {
        return res.status(500).json({ status: 500, message: 'Internal Server Error', error: err.message });
    }
};

module.exports = { signup };
