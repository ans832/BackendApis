const Book = require('../models/book');
const { bookSchema } = require("../validators/book-validator.js");

const addBook = async (req, res) => {
    // Validate input using Joi
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const { title } = req.body;

    if (!req.user) {
        return res.status(401).json({ status: 401, message: "User not authenticated" });
    }

    const userId = req.user.id;
    const username = req.user.username; 

    try {
        
        const existingBook = await Book.findOne({ title: { $regex: new RegExp(`^${title}$`, "i") } });

        if (existingBook) {
            return res.status(409).json({ status: 409, message: "Book already exists." });
        }

        
        const newBook = new Book({
            title,
            author: username, 
            user: userId
        });

        await newBook.save();

        return res.status(201).json({ 
            status: 201, 
            message: "Book added successfully", 
            book: newBook 
        });

    } catch (err) {
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
};

module.exports = { addBook };
