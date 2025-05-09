const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const permissionRoutes = require('./routes/permissionRoute');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const cors = require('cors');
const app = express();
dotenv.config();
connectDB();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Include if you're using cookies/auth
  }));
app.use(express.json());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/permissions', authMiddleware, permissionRoutes);
app.use('/api/roles', authMiddleware, roleRoutes);
app.use('/api/users', authMiddleware, userRoutes);
module.exports = app;

