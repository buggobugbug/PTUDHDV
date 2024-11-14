const db = require('../database');

// Lấy tất cả tác giả
exports.getAuthors = (req, res) => {
    db.query('SELECT * FROM authors', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Lấy thông tin tác giả theo ID
exports.getAuthorById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM authors WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Author not found' });
        res.json(results[0]);
    });
};

// Thêm tác giả mới
exports.addAuthor = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO authors (name) VALUES (?)', [name], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Author added successfully' });
    });
};

// Cập nhật tác giả
exports.updateAuthor = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE authors SET name = ? WHERE id = ?', [name, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Author updated successfully' });
    });
};

// Xóa tác giả
exports.deleteAuthor = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM authors WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Author deleted successfully' });
    });
};
