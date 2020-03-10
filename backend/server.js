const express = require('express');
const cors = require('cors');
// mongoose will help us to connect to mongoDB
const mongoose = require('mongoose');

// configure the app so that we can have our environment variables in .env file
require('dotenv').config();

 // create express server
const app = express();
// select ports
const port = process.env.PORT || 5000;

// specify cors middleware
app.use(cors());
// to parse JSON
app.use(express.json());

const uri = process.env.ATLAS_URI;
// connect to the MongoDB atlas cluster
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
// function to be executed once the connection has been made
connection.once('open', () => {
	console.log('MongoDB connection established successfully!');
});

// import router files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// direct URL to the respective router
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// start the server on given port
app.listen(port, () => {
	console.log(`Server is running on port : ${port}`)
});

