const JWT_SECRET = "nvhiuuf932u9v"


const jwt = require('jsonwebtoken');
require('dotenv').config(); 



const autho = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized Access, No token provided" });
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(String(token), JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized Access, Invalid token" });
        }
        
        req.user = { id: decoded.id, username: decoded.username };  
        next();
    });
};

module.exports = { autho };
