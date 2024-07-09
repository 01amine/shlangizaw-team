const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const meetingRoutes = require('./routes/meeting');
const chatRoutes = require('./routes/chat');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message');
const User = require('./models/User');


const app = express();

const server = http.createServer(app);
const io = socketIo(server);

require('dotenv').config();

connectDB();

const PORT = 3000




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static('public'));




app.use('/auth', authRoutes);
app.use('/meeting', meetingRoutes);
app.use('/chat', chatRoutes);



io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    jwt.verify(token, process, (err, decoded) => {
      if (err) {
        return next(new Error('Authentication error'));
      }
      socket.userId = decoded.id;
      next();
    });
  } else {
    next(new Error('Authentication error'));
  }
});


io.on('connection', socket => {
  socket.on('join-meeting', async (roomId) => {
    const user = await User.findById(socket.userId);
    if (!user) {
      return socket.disconnect();
    }

    socket.join(roomId);
    socket.to(roomId).emit('user-connected', socket.userId);
  });

  socket.on('send-chat-message', async (roomId, message) => {
    const messageObj = new Message({
      roomId,
      message,
      userId: socket.userId
    });

    await messageObj.save();
    io.to(roomId).emit('chat-message', message);
  });

  socket.on('share-screen', (roomId, screenStreamId) => {
    io.to(roomId).emit('screen-shared', screenStreamId);
  });
});



app.get('/', (req, res) => {
  res.render('index');
});
app.get('/home',(req,res)=>{
  res.render('home');
})
app.get('/auth/register', (req, res) => {
  res.render('auth/register');
});
app.get('/auth/login', (req, res) => {
  res.render('auth/login');
});
app.get('/meeting/create',(req, res) => {
  res.render('meeting/create');
});
app.get('/meeting/join',( req, res) => {
  res.render('meeting/join');
});

app.get('/meeting/:meetingCode',(req,res)=>{
  const roomId = req.params.meetingCode;
  res.render('meeting/meeting',{roomId });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
