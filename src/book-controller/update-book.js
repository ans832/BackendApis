const Book = require('../models/book.js');
const { bookSchema } = require("../validators/book-validator.js");

const updateBook = async (req, res) => {
    const { id } = req.params;

    if (!req.user) {
        return res.status(401).json({ status: 401, message: "User not authenticated" });
    }

    
    const { error } = bookSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: 400, message: error.details[0].message });
    }

    const { title } = req.body;
    const userId = req.user.id;
    const username = req.user.username; 

    try {
        
        const existingBook = await Book.findOne({ _id: id, user: userId });
        if (!existingBook) {
            return res.status(404).json({ status: 404, message: "Book not found or not owned by this user" });
        }

        
        const titleExists = await Book.findOne({ title: { $regex: new RegExp(`^${title}$`, "i") } });
        if (titleExists && titleExists._id.toString() !== id) {
            return res.status(400).json({ status: 400, message: "Book with this title already exists." });
        }

        
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author: username }, 
            { new: true } 
        );

        return res.status(200).json({ status: 200, message: "Book updated successfully", book: updatedBook });

    } catch (err) {
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
};

module.exports = { updateBook };
