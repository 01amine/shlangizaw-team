const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meeting');
const chatRoutes = require('./routes/chat');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

connectDB();

const PORT = 3000

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static('public'));

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

app.use('/auth', authRoutes);
app.use('/meeting', meetingRoutes);
app.use('/chat', chatRoutes);

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/auth/register', (req, res) => {
  res.render('auth/register');
});
app.get('/auth/login', (req, res) => {
  res.render('auth/login');
});
app.get('/meeting/create', (req, res) => {
  res.render('meeting/create');
});
app.get('/meeting/join', (req, res) => {
  res.render('meeting/join');
});

io.on('connection', (socket) => {
  socket.on('join-meeting', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on('send-chat-message', (roomId, message) => {
      io.to(roomId).emit('chat-message', message);
    });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
