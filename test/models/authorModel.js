const db = require('../database');

exports.getAllAuthors = (callback) => {
    db.query('SELECT * FROM authors', callback);
};
