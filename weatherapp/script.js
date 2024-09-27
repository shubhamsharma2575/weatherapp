const cityname = document.querySelector(".cityname")
cityname.value=""

const weatherinfo = document.querySelector(".weatherinfo")
// const place = document.querySelector(".place")
// const temp = document.querySelector(".temp")
// const feels_temp = document.querySelector(".feels_temp")
// const maxtemp = document.querySelector(".maxtemp")
// const mintemp = document.querySelector(".mintemp") 
const main_info = document.querySelector(".main_info")

const apiKey = 'e661c7e7293d723f781e21d5b44fc382';
let search = "";
let url;

if(cityname.value == ""){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (locate) {
            var currlatitude = locate.coords.latitude
            var currlongitude = locate.coords.longitude
            url = (`https://api.openweathermap.org/data/2.5/weather?lat=${currlatitude}&lon=${currlongitude}&appid=${apiKey}`)
            console.log(url)
            getdata(url)
        })
    }
}


cityname.addEventListener("keyup", function(e){
    if(e.target.value != ""){
        search = e.target.value
        // console.log(search)
        url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`;
        // console.log(url)
        getdata(url)
}
})





async function getdata(url) {
    const response = await fetch(url)
    // console.log(response)
    const data = await response.json()
    display(data)
    console.log(data)
}
// getdata(url)


function display(data){
    const temprature = (data.main.temp - 273.15).toFixed(2)
    const feelslike = (data.main.feels_like - 273.15).toFixed(2)
    const wind_direction = data.wind.deg
    if(wind_direction == 0 || wind_direction == 360){
        message = "North"
    }else if(wind_direction > 0 && wind_direction < 90){
        message = "North-East"
    }else if(wind_direction == 90){
        message = "East"
    }else if(wind_direction > 90 && wind_direction < 180){
        message = "South-East"
    }else if(wind_direction == 180){
        message = "South"
    }else if(wind_direction > 180 && wind_direction < 270){
        message = "South-west"
    }else if(wind_direction == 270){
        message = "West"
    }else if(wind_direction > 270 && wind_direction < 360){
        message = "North-West"
    }
    // console.log(data.main)
    main_info.innerHTML = `  <div class="weatherinfo">
            <h1><div class="place">${data.name} , ${data.sys.country}</div></h1>
            <div class="infobox">
            <div class="tempbox">
                <p class="heading">Temprature</p>
                <p class="temp">${temprature} C</p>
            </div>
            <div class="feels_tempbox">
                <p class="heading">Feels Like</p>
                <p class="feels_temp">${feelslike} C</p>
            </div>
            <div class="maxtempbox">
                    <p class="heading">Max Temp</p>
                    <p class="maxtemp">${(data.main.temp_max - 273.15).toFixed(2)} C</p>
                </div>
                <div class="mintempbox">
                    <p class="heading">Min Temp</p>
                    <p class="mintemp">${(data.main.temp_min - 273.15).toFixed(2)} C</p>
                </div>
            </div>

            <h3>Weather</h3>
            <div class="weatherbox">
                <div class="sky">
                    <p class="heading">Sky</p>
                    <p class="description">${data.weather[0].main}</p>
                </div>

                <div class="sky">
                    <p class="heading">Type</p>
                    <p class="description">${data.weather[0].description}</p>
                </div>

            </div>
                
            <h3>Wind</h3>
                <div class="windbox">
                <div class="windspeed">
                <p class="heading">Speed</p>
                <p class="description">${data.wind.speed} m/sec</p>
                </div>
                <div class="windspeed">
                <p class="heading">Direction</p>
                <p class="description">
                ${wind_direction} , ${message}
                </p>
                </div>
                </div>
                
        </div>
        `
}

