const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

// Lấy tất cả thể loại
router.get('/', genreController.getGenres);

// Lấy thông tin thể loại theo ID
router.get('/:id', genreController.getGenreById);

// Thêm thể loại mới
router.post('/add', genreController.addGenre);

// Cập nhật thể loại theo ID
router.put('/update/:id', genreController.updateGenre);

// Xóa thể loại theo ID
router.delete('/delete/:id', genreController.deleteGenre);

module.exports = router;
