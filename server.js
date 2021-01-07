// Setup empty JS object to act as endpoint for all routes
//86744e63c92ac49ce6a60bac199455ef - API Key name weatherapp
//https://home.openweathermap.org/api_keys
//postData();

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
const port = 8000;

// Setup Server
const server = app.listen(port, listening);

function listening(){
    console.log('server running.')
    console.log(`running on localhost: ${port}`);
}

app.get('/', (req, res)=> {
    res.send('Hello Mike! This server is running on your machine. Good.');
})
