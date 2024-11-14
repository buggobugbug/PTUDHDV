const db = require('../database');
const path = require('path');
const fs = require('fs');

// Lấy tất cả sách
exports.getBookById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT books.*, authors.name AS author_name, genres.name AS genre_name
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN genres ON books.genre_id = genres.id
        WHERE books.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Book not found' });
        res.json(results[0]);
    });
};

// Thêm sách mới
exports.addBook = (req, res) => {
    const { title, author_id, genre_id, description } = req.body;
    const image = req.files ? req.files.image : null;

    let imagePath = null;
    if (image) {
        // Tạo đường dẫn lưu ảnh
        imagePath = `uploads/${Date.now()}-${image.name}`;

        // Di chuyển ảnh vào thư mục 'uploads'
        image.mv(imagePath, (err) => {
            if (err) {
                console.error("Failed to upload image:", err);
                return res.status(500).json({ error: 'Failed to upload image' });
            }
        });
    }

    // Lưu thông tin sách vào cơ sở dữ liệu
    const query = 'INSERT INTO books (title, author_id, genre_id, description, image) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, author_id, genre_id, description, imagePath], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Book added successfully' });
    });
};

// Cập nhật sách
exports.updateBook = (req, res) => {
    const { id } = req.params;
    const { title, author_id, genre_id, description } = req.body;
    const image = req.files ? req.files.image : null;

    // Kiểm tra xem sách có tồn tại hay không
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Book not found' });

        // Giữ lại đường dẫn ảnh cũ nếu không có ảnh mới
        let imagePath = results[0].image;

        // Nếu có ảnh mới, cập nhật ảnh
        if (image) {
            imagePath = `uploads/${Date.now()}-${image.name}`;
            image.mv(imagePath, (err) => {
                if (err) {
                    console.error("Failed to upload image:", err);
                    return res.status(500).json({ error: 'Failed to upload image' });
                }
            });

            // Xóa ảnh cũ nếu có
            if (results[0].image) {
                fs.unlink(results[0].image, (err) => {
                    if (err) console.error("Failed to delete old image:", err);
                });
            }
        }

        // Cập nhật thông tin sách
        const query = image
            ? 'UPDATE books SET title = ?, author_id = ?, genre_id = ?, description = ?, image = ? WHERE id = ?'
            : 'UPDATE books SET title = ?, author_id = ?, genre_id = ?, description = ? WHERE id = ?';

        const params = image
            ? [title, author_id, genre_id, description, imagePath, id]
            : [title, author_id, genre_id, description, id];

        db.query(query, params, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Book updated successfully' });
        });
    });
};



// Xóa sách
exports.deleteBook = (req, res) => {
    const { id } = req.params;

    // Lấy thông tin sách để xóa file ảnh
    db.query('SELECT image FROM books WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Book not found' });

        const imagePath = results[0].image;
        if (imagePath) {
            // Xóa ảnh khỏi thư mục 'uploads'
            fs.unlink(imagePath, (err) => {
                if (err) console.error("Failed to delete image:", err);
            });
        }

        // Xóa sách khỏi cơ sở dữ liệu
        db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Book deleted successfully' });
        });
    });
};
