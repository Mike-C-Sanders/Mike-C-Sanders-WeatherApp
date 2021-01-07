/* Global Variables */

let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q='
let apiKey = '7ddac6b965b24370c39787b9c1d7fc4d';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//event listener to determine if an action has been performed.
document.getElementById('generate').addEventListener('click', performAction);

//action performed when clicking the generate button.
function performAction(e){
    
}

