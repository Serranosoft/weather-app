// search input
const searchCity = document.getElementById("search-city");

// info span values
const country_flag = document.getElementById("flag")
const city = document.getElementById("city");
const country = document.getElementById("country");
const temp = document.getElementById("temp");
const feel_temp = document.getElementById("feel_temp");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const errorMsg = document.getElementById("error-msg");
const weather_icon = document.getElementById("weather-icon");


// info values
const temperature = document.getElementById("temperature")
const info_box_temp = document.getElementById("box1")
const info_box_wind = document.getElementById("box2")
const info_box_humidity = document.getElementById("box3")


searchCity.addEventListener("keypress", (e) => {
    if(e.key === "Enter" || e.key === 13){
        let cityInput = searchCity.value;
        getWeather(cityInput)
    }
})

const getWeather = (cityInput) => {
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&lang=es&units=metric&appid=7477be524ec3d81348c37ba105fe8820", {
        mode: 'cors'
    })
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response);
            if(response.name === undefined || response.name === null || response.name === "") {
                errorMsg.innerHTML = "No tenemos datos de ese pais/ciudad"
            } else {
                errorMsg.innerHTML = "";
                city.innerHTML = response.name
                country.innerHTML = response.sys.country;
                temp.innerHTML = Math.floor(response.main.temp);
                weather_icon.src = "http://openweathermap.org/img/wn/"+response.weather[0].icon+"@2x.png"
                feel_temp.innerHTML = Math.floor(response.main.feels_like);
                wind.innerHTML = Math.floor(response.wind.speed);
                humidity.innerHTML = Math.floor(response.main.humidity);
                getFlag(country.textContent);
                paintValues(temp.textContent, feel_temp.textContent, wind.textContent, humidity.textContent)
            }

        }).catch(function (err) {
            console.log(err);
        });
}

const getFlag = (country) => {
    country_flag.src = "https://www.countryflags.io/"+country+"/flat/64.png";
}

const paintValues = (t, f, w, h) => {
    console.log(t);
    if(t < 18) {
        console.log("AAAAAAA");
        temperature.setAttribute("style", "color: #3C675A")
    } else {
        temperature.setAttribute("style", "color: #A83D10")
    }

    if(f < 18) {
        info_box_temp.setAttribute("style", "color: #3C675A")
    } else {
        info_box_temp.setAttribute("style", "color: #A83D10")
    }

    if(w >= 15) {
        info_box_wind.setAttribute("style", "color: #3C675A")
    } else {
        info_box_wind.setAttribute("style", "color: #A83D10")
    }

    if(h >= 80) {
        info_box_humidity.setAttribute("style", "color: #3C675A")
    } else {
        info_box_humidity.setAttribute("style", "color: #A83D10")
    }

} 

const init = (() => {
    // init
    getWeather("spain");
})() 