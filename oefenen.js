// DOM Elements
const sendButton = document.getElementById("submit");
const searchField = document.getElementById("search");
const name = document.getElementById("name");
const weather = document.getElementById("weather");
const forecast = document.getElementById("forecast");
// Appendchild with the results
const appendedImgContainer = document.createElement("div");
const appendedInfoContainer = document.createElement("div");
const img = document.createElement("img");
const appendedImgText = document.createElement("div");
const appendedName = document.createElement("div");
const appendedTemp = document.createElement("div");
const appendedHumidity = document.createElement("div");
const appendedWind = document.createElement("div");
const appendedWindDir = document.createElement("div");
const appendedForecast = document.createElement("div");


// Functions to fetch and request data
const sendHttpRequest = (method, url, data) => {
    return fetch(url, {method: method})
    .then(response => {
    return response.json()
    });
};

const getData = (city) => {
    sendHttpRequest('GET', `https://api.weatherapi.com/v1/forecast.json?key=656c8ac5fa7a470f86c102142212402&q=${city}`)
    .then(data => {
        // log data
        console.log(data.forecast.forecastday); 
        // append Name
        name.appendChild(appendedName);
        appendedName.classList.add("text");
        appendedName.innerHTML=`${data.location.name}, ${data.location.region}, ${data.location.country}`;
          // weather img
        weather.appendChild(appendedImgContainer)
        appendedImgContainer.classList.add("img-container");
        appendedImgContainer.appendChild(img);
        img.setAttribute('src', `https:${data.current.condition.icon}`);
        img.setAttribute('width', '100px');
        appendedImgContainer.appendChild(appendedImgText);
        appendedImgText.innerHTML=data.current.condition.text;
        // append temp
        weather.appendChild(appendedTemp)
        appendedTemp.innerHTML=`${data.current.temp_c}°C`;
        appendedTemp.classList.add("text");
        // append humidity
        weather.appendChild(appendedInfoContainer);
        appendedInfoContainer.classList.add("img-container");
        appendedInfoContainer.classList.add("info");
        appendedInfoContainer.appendChild(appendedHumidity);
        appendedHumidity.innerHTML=`humidity: ${data.current.humidity}%`;
        appendedInfoContainer.appendChild(appendedWind);
        appendedWind.innerHTML=`wind: ${data.current.wind_kph}km/h`;
        appendedInfoContainer.appendChild(appendedWindDir);
        appendedWindDir.innerHTML=`wind direction: ${data.current.wind_dir}`;
    });
};

sendButton.addEventListener("click", () => {
    event.preventDefault();
    getData(searchField.value);
});



