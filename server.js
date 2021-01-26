// Setup empty JS object to act as endpoint for all routes
//7ddac6b965b24370c39787b9c1d7fc4d - API Key name weatherapp
//https://home.openweathermap.org/api_keys

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

//weather data array
let weatherData = [];

//Get the weather data based on user input
app.get('/all', getData);
//post weather data
app.post('/addWeather', addWeather);

function getData(req, res){
    console.log('Get Data')
    res.send(weatherData);
}

//Object creation for data
function addWeather(req, res){
    console.log('Add Weather Function')
    let projectData = {
        temperature: req.body.temperature,
        location: req.body.location,
        date: req.body.date,
        content: req.body.content
    
    }
    weatherData.push(projectData);
    console.log('after push call')
    res.send(weatherData);
    console.log(weatherData);

}
