const db = require('../database');

exports.getAllGenres = (callback) => {
    db.query('SELECT * FROM genres', callback);
};
