// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server and Callback to debug
const port = 8080;
const server = app.listen(port, () => console.log(`Running on port : ${port}`));

// Initialize all route with a callback function
const getData = (req, res) => {
    res.send(projectData);
};
// Callback function to complete GET '/all'
app.get('/all', getData);

// Post Route
const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.send(projectData);
};
app.post('/add', postData);