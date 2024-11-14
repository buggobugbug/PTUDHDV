const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');

const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const genreRoutes = require('./routes/genreRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ createParentPath: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/genres', genreRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
