/* eslint-disable no-console */
/* eslint-disable eol-last */

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const cors = require('cors');

require('dotenv').config();
// Set up the port
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect the database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const { connection } = mongoose;
connection.once('open', () => {
  console.log('Mongo database connected succelly');
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Set up the server
// eslint-disable-next-line no-shadow
app.listen((port), () => {
  // eslint-disable-next-line no-console
  console.log(`Server running in the port ${port}`);
});