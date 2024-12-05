require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const threatsRoutes = require('./routes/threats');
const leaderboardRoutes = require('./routes/leaderboard');
const donationsRoutes = require('./routes/donations');
const connectDB = require('./database/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/threats', threatsRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/donations', donationsRoutes);

// Error handling for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
