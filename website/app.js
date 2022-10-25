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

setTimeout(responsive(), 0);
//End of the event listener

/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=1db1d39332b7674fb6a893490bf884b6&units=imperial";
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//control error message
const errorMsgBox = document.getElementById("errorMsg");

//get data for zip and felling and pass to async function as a parameters to get weather data
const getData = () => {
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;

  //pass as a parameters and get weather data
  getWeatherData(zipCode).then((data) => {
    //console.log(data);
    console.log(data.cod);
    //control if response code does not eqal 200 to show error msg
    if (data.cod != 200) {
      clearData();
      if (data.cod == 400) {
        errorMsgBox.innerHTML = "Please enter vaild ZIP code";
      } else if (data.cod == 404) {
        errorMsgBox.innerHTML =
          "Something went wronge, please check your ZIP code and try again";
      } else {
        errorMsgBox.innerHTML = "Sorry something went wronge";
      }
    } else {
      errorMsgBox.innerHTML = "";
    }
    const DOMData = {
      cityName: data.name,
      newDate,
      temp: data.main.temp,
      feeling,
    };
    console.log("DOM Data :=> " + DOMData);

    //function to post data to server
    postData("/add", DOMData);

    //function to update UI to show new data
    updateUI();
  });
};

generateButton.addEventListener("click", getData);
//get weather data function implementation

const getWeatherData = async (zipCode) => {
  try {
    const res = await fetch(baseURL + zipCode + apiKey);
    const data = res.json();

    return data;
  } catch (error) {
    console.log("Error : " + error);
  }
};

//post data function implementation

const postData = async (url = "", data = {}) => {
  //console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    //console.log("New data : " + newData);
    return newData;
  } catch (error) {
    console.log("Error: " + error);
  }
};

//updateUI function implementation

const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    //console.log(allData);

    //write update data to DOM elements
    document.getElementById("city").innerHTML = allData.cityName;
    document.getElementById("temp").innerHTML =
      "Temperature : " + Math.round(allData.temp) + " °F";
    document.getElementById("content").innerHTML = allData.feeling;
    document.getElementById("date").innerHTML = allData.newDate;
  } catch (error) {
    console.log("Error : " + error);
  }
};

//Function to clear data
const clearData = () => {
  document.getElementById("city").innerHTML = "";
  document.getElementById("temp").innerHTML = "";
  document.getElementById("content").innerHTML = "";
  document.getElementById("date").innerHTML = "";
};
