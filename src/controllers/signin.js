const JWT_SECRET = "nvhiuuf932u9v";
const User = require('../models/user.js');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { signinSchema } = require("../validators/auth-validator.js");

const signin = async (req, res) => {
    
    const { error } = signinSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const { email, password } = req.body;

    try {
        
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ status: 401, message: "Invalid email/password" });
        }

        
        const token = jwt.sign(
            { id: existingUser._id, username: existingUser.username }, // Include username in token
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            status: 200,
            message: "Successfully logged in",
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
            token
        });

    } catch (err) {
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
};

const autho = async (req, res, next) => {
    const headers = req.headers["authorization"];
    const token =  headers.split(" ")[1];

    if (!token) {
        res.status(401).json({ status: 401, message: "Unauthorized" });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ status: 403, message: "Forbidden" });
        }
        req.user = user;
        next();
    });
}







module.exports = {  signin ,autho };
