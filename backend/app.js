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
  origin: 'https://diary-ge3k7wjvx-stackdsas-projects.vercel.app' // Replace with your frontend URL
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://diary-ge3k7wjvx-stackdsas-projects.vercel.app'); // Replace with your frontend URL
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;