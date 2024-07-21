const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".weatherCity");
const card  = document.querySelector(".card");
const APIKey = "675c855367d9d1f64a7d3b2a569d153a";

weatherForm.addEventListener("submit",async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            window.alert(error);
            DisplayError(error);
        }
    }
    else{
        DisplayError("Please Enter a City");
    }

});

async function getWeatherData(city){
    const APIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey} `;

    const response = await fetch(APIURL);
    if(!response.ok){
        throw new Error("Could find Weather data!")
    }else{
        return await response.json();
    }
};

function displayWeatherInfo(data){
    const {name: city,
            main: {temp, humidity},
            weather :[{description,id}]} = data;
    
            card.textContent = "";
            card.style.display = "flex";

            const cityDisplay = document.createElement("h1");
            const tempDisplay = document.createElement("p");
            const humdityDisplay = document.createElement("p");
            const descDisplay = document.createElement("p");
            const weatherEmoje = document.createElement("p");

            cityDisplay.textContent = city;
            tempDisplay.textContent = `${Math.floor(temp - 273)}°C`
            humdityDisplay.textContent = `Humidity :${humidity}%`;
            descDisplay.textContent = description;
            weatherEmoje.textContent = getWeatherEmoji(id);

            cityDisplay.classList.add("cityDisplay");
            tempDisplay.classList.add("tempDisplay");
            humdityDisplay.classList.add("humidityDisplay");
            descDisplay.classList.add("descDisplay");
            weatherEmoje.classList.add("weatherEmoji");

            card.appendChild(cityDisplay);
            card.appendChild(tempDisplay);
            card.appendChild(humdityDisplay);
            card.appendChild(descDisplay);
            card.appendChild(weatherEmoje);

};

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⚡";
            
        case (weatherId >= 300 && weatherId < 400):
            return "☔";
            
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
            
        case (weatherId >= 600 && weatherId < 700):
            return "🌨❄";
        
        case (weatherId >= 700 && weatherId < 800):
            return "💨";

        case (weatherId === 800):
            return "☀";
        
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        
        default :
            return "❓";
    }
};

function DisplayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
