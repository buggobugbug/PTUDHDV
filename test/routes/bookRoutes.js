const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/:id', bookController.getBookById);
router.post('/add', bookController.addBook);
router.put('/update/:id', bookController.updateBook);
router.delete('/delete/:id', bookController.deleteBook);

module.exports = router;
