const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
console.log(connectDB);
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/comments', require('./routes/commentRoutes'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Comment service running on port ${PORT}`));
