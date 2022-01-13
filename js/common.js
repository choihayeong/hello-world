// WEATHER
// current
let currentLocation = document.querySelector('#current-weather .main-weather__location span:first-child');
let currentCountry = document.querySelector('#current-weather .main-weather__location span:nth-child(2)');
let currentDesc = document.querySelector('#current-weather .main-weather__desc');
let currentTemp = document.querySelector('#current-weather .main-weather__temp span');
let currentIcon = document.querySelector('#current-weather .main-weather__icon');
let currentWind = document.querySelector('#current-weather .main-weather__wind span');
let currentHumidity = document.querySelector('#current-weather .main-weather__humidity span');
let currentCloud = document.querySelector('#current-weather .main-weather__cloud span');

// icon Change
let iconChange = {
    '01d': 'wi wi-day-sunny',
    '01n': 'wi wi-night-clear',
    '02d': 'wi wi-day-cloudy',
    '02n': 'wi wi-night-alt-cloudy',
    '03d': 'wi wi-cloud',
    '03n': 'wi wi-cloud',
    '04d': 'wi wi-cloudy',
    '04n': 'wi wi-cloudy',
    '09d': 'wi wi-showers',
    '09n': 'wi wi-showers',
    '10d': 'wi wi-rain',
    '10n': 'wi wi-rain',
    '11d': 'wi wi-thunderstorm',
    '11n': 'wi wi-thunderstorm',
    '13d': 'wi wi-snow',
    '13n': 'wi wi-snow',
    '50d': 'wi wi-fog',
    '50n': 'wi wi-fog',
};

function onGeoOk(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${apiKey}&units=metric`;

    console.log(currentUrl);

    fetch(currentUrl).then(function(res) {
        return res.json();
    }).then(function(weather) {
        let iconClass = iconChange[`${weather.weather[0].icon}`];

        currentLocation.textContent = weather.name;
        currentCountry.textContent = `${weather.sys.country}`;
        currentDesc.textContent = `${weather.weather[0].description}`;
        currentTemp.textContent = `${weather.main.temp}`;
        currentIcon.innerHTML = `<i class="${iconClass}"></i>`;
        currentWind.textContent = `${weather.wind.speed}`;
        currentHumidity.textContent = `${weather.main.humidity}`;
        currentCloud.textContent = `${weather.clouds.all}`;
    });
}

function onGeoError() {
    alert("위치를 알 수 없어 정보를 불러올 수 없습니당");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

// search
let inputLocation = document.querySelector('#f-location');
const searchForm = document.querySelector('#searchForm');
const searchBtn = document.querySelector('.btn--search');

const apiKey = "yourapikey";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&lang=kr&appid=${apiKey}&units=metric`;

let inputUrl;

const searchBox = document.querySelector('#search-weather');
let searchLocation = document.querySelector('#search-weather .main-weather__location span:first-child');
let searchCountry = document.querySelector('#search-weather .main-weather__location span:nth-child(2)');
let searchDesc = document.querySelector('#search-weather .main-weather__desc');
let searchTemp = document.querySelector('#search-weather .main-weather__temp span');
let searchIcon = document.querySelector('#search-weather .main-weather__icon');
let searchWind = document.querySelector('#search-weather .main-weather__wind span');
let searchHumidity = document.querySelector('#search-weather .main-weather__humidity span');
let searchCloud = document.querySelector('#search-weather .main-weather__cloud span');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let locationVal = inputLocation.value;
    inputUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationVal}&lang=kr&appid=${apiKey}&units=metric`;

    if(typeof inputUrl != 'error') {
        function fetchWeather() {
            return fetch(inputUrl).then(function(response) {
                return response.json();
            });
        };

        async function logWeather2() {
            try {
                let weather = await fetchWeather();
                let iconClass = iconChange[`${weather.weather[0].icon}`];
                
                searchBox.style.display = "block";
                searchLocation.textContent = `${weather.name}`;
                searchCountry.textContent = `${weather.sys.country}`;
                searchDesc.textContent = `${weather.weather[0].description}`;
                searchTemp.textContent = `${weather.main.temp}`;
                searchIcon.innerHTML = `<i class="${iconClass}"></i>`;
                searchWind.textContent = `${weather.wind.speed}`;
                searchHumidity.textContent = `${weather.main.humidity}`;
                searchCloud.textContent = `${weather.clouds.all}`;
            } catch (error) {
                console.log(error);
                alert("해당 지역을 찾을 수 없습니당");
            }
        }

        logWeather2();
    } 
    
});