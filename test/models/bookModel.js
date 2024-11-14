const db = require('../database');

exports.getAllBooks = (callback) => {
    const query = `
        SELECT books.id, books.title, books.description,
               authors.name AS author, genres.name AS genre
        FROM books
        LEFT JOIN authors ON books.author_id = authors.id
        LEFT JOIN genres ON books.genre_id = genres.id
    `;
    db.query(query, callback);
};

exports.getBookById = (id, callback) => {
    db.query('SELECT * FROM books WHERE id = ?', [id], callback);
};

exports.addBook = (book, callback) => {
    db.query('INSERT INTO books SET ?', book, callback);
};

exports.updateBook = (id, book, callback) => {
    db.query('UPDATE books SET ? WHERE id = ?', [book, id], callback);
};

exports.deleteBook = (id, callback) => {
    db.query('DELETE FROM books WHERE id = ?', [id], callback);
};
