const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Lấy tất cả tác giả
router.get('/', authorController.getAuthors);

// Lấy thông tin tác giả theo ID
router.get('/:id', authorController.getAuthorById);

// Thêm tác giả mới
router.post('/add', authorController.addAuthor);

// Cập nhật tác giả theo ID
router.put('/update/:id', authorController.updateAuthor);

// Xóa tác giả theo ID
router.delete('/delete/:id', authorController.deleteAuthor);

module.exports = router;
