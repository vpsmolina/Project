const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const  createError = require('http-errors');
const  account = require('./routes/account');
const  event = require('./routes/event');
const  passport = require('passport');
const config = require('./config/db');

const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(cors({origin: 'http://localhost:4200'}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'public')));
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true } );

mongoose.connection.on('connected', () => {
  console.log("Мы успешно");
});

mongoose.connection.on('error', (err) => {
  console.log("Мы не успешно" + err);
});

/*app.get('/', (req, res) => {
  res.send('NOW');
});*/

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});*/

app.use('/account', account);
app.use('/event', event);

const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
});
