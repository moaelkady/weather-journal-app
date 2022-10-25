/**
 * this is event listener for application styling
 * it's basic usage is to toggle classes
 * hide class will be for hiding sidebar which is for input area
 * full width class if for main page body which will display content for body content
 */

const entryArea = document.getElementsByClassName("entryArea")[0];
const outputArea = document.getElementsByClassName("outputArea")[0];
const classToggler = document.getElementById("toggleEntryArea");
const generateButton = document.getElementById("generate");

const responsive = () => {
  const myTogglers = [classToggler, generateButton];
  for (let i = 0; i < myTogglers.length; i++) {
    myTogglers[i].addEventListener("click", () => {
      entryArea.classList.toggle("hide");
      outputArea.classList.toggle("full-width");
      classToggler.classList.toggle("barsX");
    });
  }
};

setTimeout(responsive(),0);

//End of the event listener

/* Global Variables */
/*const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ',&appid=1db1d39332b7674fb6a893490bf884b6&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
*/
