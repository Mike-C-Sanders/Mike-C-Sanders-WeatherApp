
//base url to openweathermap.org/
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=7ddac6b965b24370c39787b9c1d7fc4d';
//since we're using zipcode we need to have the country code as part of the called variable
let countryCode = ',us';
//units for Fahrenheit Units using units=imperial
let tempUnits = '&units=imperial'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener to determine if an action has been performed.
document.getElementById('generate').addEventListener('click', doPromisedAction);

//action performed when clicking the generate button.
function doPromisedAction(e){
    performAction(e);
}
//async perform action function
const performAction = async (e) =>{
    try{
        let newZip = document.getElementById('zip').value; // getting the value from the user's input.
        let feelings = document.getElementById('feelings').value;
        
        const data = await getWeatherData(baseURL, newZip, apiKey, countryCode, tempUnits);
         
            //Add data to the server object before posting to UI
        await postData('/addWeather', {temperature: data.main.temp, 
                location: data.name, date: newDate, content: feelings});
    
        await updateUI();
    }
    catch(error){
        console.log('error', error);
    }
    
}
//get weather data from weathermap using zipcode.
const getWeatherData = async (bURL, zip, key, code, units)=>{
    const res = await fetch(bURL+zip+code+units+key);
    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log('error', error);
    }
}

//Post data function used for the weather posting to server.
const postData = async (url = '', data = {}) =>{
    const response = await fetch(url, {
        method: 'POST', //Post route method
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), //body data type
    });
    try{
        const newData = await response.json();
        return newData;
    }catch(error){
        console.log('error', error);
    }
}

const updateUI = async()=>{
    //fetching from the local server
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        document.getElementById('content').innerHTML = 'You feel: '+ allData[0].content;
        document.getElementById('date').innerHTML = `Today's Date: ` + allData[0].date;
        document.getElementById('temp').innerHTML = 'Temprature: ' + allData[0].temperature + 'F';
        document.getElementById('location').innerHTML = 'City: ' + allData[0].location;
    }catch(error){
        console.log('error', error);
    }
}
