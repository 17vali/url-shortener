const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();

connectDB();

app.use(cookieParser());

app.use('/redirect', require('./routes/redirect'));
app.use('/create', require('./routes/create'));
app.use('/update', require('./routes/update'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));