const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const connectDB = require('./config/database');

const systemRoutes = require('./routes/system');
const directoryRoutes = require('./routes/directory');
const serviceRoutes = require('./routes/service');

const port = 3000 ; 


dotenv.config();

const app = express();


app.use(express.json());

// ui
app.set('view engine', 'ejs');
app.set('views','views');
app.use(express.static('public'));


connectDB();


app.use('/api/system', systemRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/service', serviceRoutes);


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});



const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
