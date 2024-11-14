const db = require('../database');

// Lấy tất cả thể loại
exports.getGenres = (req, res) => {
    db.query('SELECT * FROM genres', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Lấy thông tin thể loại theo ID
exports.getGenreById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM genres WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Genre not found' });
        res.json(results[0]);
    });
};

// Thêm thể loại mới
exports.addGenre = (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO genres (name) VALUES (?)', [name], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Genre added successfully' });
    });
};

// Cập nhật thể loại theo ID
exports.updateGenre = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE genres SET name = ? WHERE id = ?', [name, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Genre updated successfully' });
    });
};

// Xóa thể loại
exports.deleteGenre = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM genres WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Genre deleted successfully' });
    });
};
