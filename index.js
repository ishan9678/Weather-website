let weather = {
    apiKey : "106e6736c47541c7a65173058231903",
    fetchWeather: function(city){
        fetch(
           "https://api.weatherapi.com/v1/current.json?key=" + this.apiKey + "&q=" + city + "&aqi=no"
        ).then((response) => response.json())
        .then((data)=> this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data.location;
        const {icon,text} = data.current.condition;
        const {temp_c,humidity} = data.current;
        const {wind_kph,precip_mm} = data.current;
        document.querySelector("h2").innerHTML="Weather in " + name; 
        document.querySelector("h1").innerHTML= temp_c + "°C"; 
        document.querySelector("img").src = icon; 
        document.querySelector(".type").innerText = text;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".precipitation").innerHTML = "Precipitation: " + precip_mm + "mm";
        document.querySelector(".wind").innerText = "Wind Speed: " + wind_kph + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name + "')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
}

document.querySelector(".search-button").addEventListener('click',function(){
    weather.search();
})

document.addEventListener('keypress',function(){
    weather.search();
})
