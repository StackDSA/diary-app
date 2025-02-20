const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

// Load environment variables from .env file
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(express.json());
app.use("/images", express.static(path.join("backend/images")));

app.use(cors({
  origin: 'https://diary-3ds0gb3qp-stackdsas-projects.vercel.app' // Replace with your frontend URL
}));

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;