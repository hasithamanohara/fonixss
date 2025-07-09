const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactsRouter = require('./routes/routes.js');

const app = express();

// Middleware
app.use(cors({
      origin: 'http://localhost:4000'
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
      // useNewUrlParser: true,
      useUnifiedTopology: true
}).then(() => {
      console.log('Connected to MongoDB');
}).catch(err => {
      console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/contacts', contactsRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
});