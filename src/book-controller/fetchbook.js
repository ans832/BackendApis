const Book = require('../models/book');

const getBooks = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ status: 401, message: "User not authenticated" });
    }

    const userId = req.user.id;

    try {
        const books = await Book.find({ user: userId });

        if (books.length === 0) {
            return res.status(404).json({ status: 404, message: "No books found for this user." });
        }

        return res.status(200).json({ 
            status: 200, 
            message: "Books retrieved successfully", 
            books 
        });

    } catch (err) {
        return res.status(500).json({ status: 500, message: "Internal Server Error", error: err.message });
    }
};

module.exports = { getBooks };
