let weather = {
    apiKey : "106e6736c47541c7a65173058231903",
    
    fetchWeather: function(city){
        fetch(
           "https://api.weatherapi.com/v1/forecast.json?key=" + this.apiKey + "&q=" + city + "&days=7&aqi=no&alerts=no"
        ).then((response) => response.json())
        .then((data)=> this.displayWeather(data));
    },

    fetchForecast: function(city,i){
        fetch(
           "https://api.weatherapi.com/v1/forecast.json?key=" + this.apiKey + "&q=" + city + "&days=7&aqi=no&alerts=no"
        ).then((response) => response.json())
        .then((data)=> this.displayForecast(data,i));
    },
    

    displayWeather: function(data){
        const {name} = data.location;
        const {icon,text} = data.current.condition;
        const {temp_c,humidity} = data.current;
        const {wind_kph,precip_mm} = data.current;
        
        console.log(name,icon,text,temp_c,humidity,precip_mm,wind_kph);
        
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
    

    displayForecast: function(data,i){
        
        const {name} = data.location;
        const forecastAvgTemp = data.forecast.forecastday[i].day.avgtemp_c;
        const forecastAvgHumidity = data.forecast.forecastday[i].day.avghumidity;
        const forecastText = data.forecast.forecastday[i].day.condition.text;
        const forecastIcon = data.forecast.forecastday[i].day.condition.icon;
        const forecastMaxWind = data.forecast.forecastday[i].day.maxwind_kph;
        const forecastTotalPrecip = data.forecast.forecastday[i].day.totalprecip_mm;

        console.log(forecastAvgTemp,forecastAvgHumidity,forecastText,forecastIcon,forecastMaxWind,forecastTotalPrecip);
                
        document.querySelector("h2").innerHTML="Weather in " + name; 
        document.querySelector("h1").innerHTML= forecastAvgTemp + "°C"; 
        document.querySelector("img").src = forecastIcon; 
        document.querySelector(".type").innerText = forecastText;
        document.querySelector(".humidity").innerText = "Avg humidity: " + forecastAvgHumidity + "%";
        document.querySelector(".precipitation").innerHTML = "Total precipitation: " + forecastTotalPrecip + "mm";
        document.querySelector(".wind").innerText = "Max wind speed: " + forecastMaxWind + "km/h";
        document.querySelector(".weather").classList.remove("loading");
        // document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+ name + "')"
        
    },


    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

    searchForecast: function(i){
        this.fetchForecast(document.querySelector(".search-bar").value,i);
    }

}

const d = new Date();
let day = d.getDate();
const monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = d.getMonth();
let year = d.getFullYear();
document.querySelector(".today").innerHTML = day + " " + monthName[month] + " "+ year;
document.querySelector(".today1").innerHTML = day+1 + " " + monthName[month] + " "+ year;
document.querySelector(".today2").innerHTML = day+2 + " " + monthName[month] + " "+ year;
document.querySelector(".today3").innerHTML = day+3 + " " + monthName[month] + " "+ year;
document.querySelector(".today4").innerHTML = day+4 + " " + monthName[month] + " "+ year;
document.querySelector(".today5").innerHTML = day+5 + " " + monthName[month] + " "+ year;
document.querySelector(".today6").innerHTML = day+6 + " " + monthName[month] + " "+ year;



document.querySelector(".search-button").addEventListener('click',function(){
    weather.search();
})

document.addEventListener('keypress',function(){
    weather.search();
})

const myCarousel = document.getElementById('carouselExample');
var carouselRight = myCarousel.querySelector('.carousel-control-next');
var carouselLeft = myCarousel.querySelector('.carousel-control-prev');
var i = 0;

carouselLeft.addEventListener('click', function(e) {
    if (e.direction === 'right') {
      return;
    }
  
    // code for left
    if(i==0){
        i = 7;
    }

    i -= 1;

    if(i==0){
        weather.search();
    }

    console.log(i);
    console.log(document.querySelector(".today"+i).innerHTML);
    weather.searchForecast(i);
});

carouselRight.addEventListener('click', function(e) {
    if (e.direction === 'left') {
            return;
    }
    
    // code for right
    if(i==6){
        i = -1;
    }

    i += 1;
        
    if(i==0){
        weather.search();
    }
        
    console.log(i);
    console.log(document.querySelector(".today"+i).innerHTML);
    weather.searchForecast(i);
});
