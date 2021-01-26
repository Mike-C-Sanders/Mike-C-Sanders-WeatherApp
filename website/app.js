
//base url to openweathermap.org/
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=7ddac6b965b24370c39787b9c1d7fc4d';
//since we're using zipcode we need to have the country code as part of the called variable
let countryCode = ',us';
//units for Fahrenheit Units using units=imperial
let tempUnits = '&units=imperial'
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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
            console.log('2 then add to server');
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
        console.log('1 Get data');
        return data;
    }catch(error){
        console.log('error', error);
    }
}

//Post data function used for the weather posting to server.
const postData = async (url = '', data = {}) =>{
    console.log('3 data to server');
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
        console.log('4 Posting newData');
        return newData;
    }catch(error){
        console.log('error', error);
    }
}

const updateUI = async()=>{
    //fetching from the local server
    console.log('before request');
    const request = await fetch('/all');
    try{
        console.log('after request');
        console.log(request);
        const allData = await request.json();
        console.log(allData[0].icon);
        document.getElementById('content').innerHTML = 'You feel: '+ allData[0].content;
        document.getElementById('date').innerHTML = `Today's Date: ` + allData[0].date;
        document.getElementById('temp').innerHTML = 'Temprature: ' + allData[0].temperature + 'F';
        document.getElementById('location').innerHTML = 'City: ' + allData[0].location;
    }catch(error){
        console.log('error', error);
    }
}
