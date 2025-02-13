const express = require('express');
const {signup} = require('../controllers/user-controller.js');
const {signin} = require('../controllers/signin.js');
const {addBook} = require('../book-controller/addbook.js');
const {getBooks} = require('../book-controller/fetchbook.js');
const {autho} = require('../middlewares/auth.js');
const {updateBook} = require('../book-controller/update-book.js');


const router = express.Router();

router.post('/signup', signup);
router.post('/login', signin);
router.post('/add', autho, addBook);
router.get('/fetch', autho, getBooks);
router.get("/user", autho);
router.put('/update/:id', autho, updateBook);


module.exports = router;