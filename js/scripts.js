const API_KEY = "01eb8a4b19f74d035ad46d4a3f819b80";
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

// current weather & location 
const currentWeather = document.querySelector('#currentWeather');
const currentIcon = currentWeather.querySelector('.item-info__icon');
const currentTemperature = currentWeather.querySelector('.item-info__temperature');
const currentDesc = currentWeather.querySelector('.item-info__description');
const currentLocation = currentWeather.querySelector('.item-info__location');
const currentWind = currentWeather.querySelector('.item-info__wind span');
const currentHumidity = currentWeather.querySelector('.item-info__humidity span');
const currentCloud = currentWeather.querySelector('.item-info__cloud span');

function getLocationSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}&units=metric`;

    fetch(currentUrl)
        .then(response => response.json())
        .then(weather => {
            const iconClass = iconChange[`${weather.weather[0].icon}`];

            currentIcon.innerHTML = `<i class="${iconClass}"></i>`;
            currentTemperature.textContent = `${weather.main.temp} ℃`;
            currentDesc.textContent = weather.weather[0].description;
            currentLocation.textContent = `${weather.name}, ${weather.sys.country}`;
            currentWind.textContent = weather.wind.speed;
            currentHumidity.textContent = weather.main.humidity;
            currentCloud.textContent = weather.clouds.all;            
        });

    locationForecast(lat, lon);
}
function createForecastItem(id) {
    const currentForecast = document.querySelector('#currentForecast');
    const div = document.createElement('div');
    const span = document.createElement('span');

    div.classList.add('forecast-info');
    div.id = id;
    currentForecast.appendChild(div);

    for (let i = 0; i < 4; i++) {
        createForecastInfo(div);
    }
}
function createForecastInfo(ele) {
    const span = document.createElement('span');
    ele.appendChild(span);
}
function locationForecast (lat, lon) {
    const locationUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric&lang=kr`;

    fetch(locationUrl)
        .then(response => response.json())
        .then(weather => {
            const dailyArr = weather.daily;

            dailyArr.forEach(ele => {
                createForecastItem(ele.dt);

                const forecastInfo = document.querySelectorAll('.forecast-info');

                const iconClass = iconChange[ele.weather[0].icon];
                const eleDate = new Date(ele.dt * 1000);
                const eleTemp = ele.temp.day;
                const eleIcon = `<i class="${iconClass}"></i>`;
                const eleDescription = ele.weather[0].description;

                forecastInfo.forEach(info => {
                    if (ele.dt === Number(info.id)) {
                        const date = info.querySelector('span:first-child');
                        const icon = info.querySelector('span:nth-child(2)');
                        const temp = info.querySelector('span:nth-child(3)');
                        const description = info.querySelector('span:nth-child(4)');

                        date.textContent = `${eleDate.getMonth() + 1} / ${eleDate.getDate()}`
                        icon.innerHTML = eleIcon;
                        temp.textContent = `${eleTemp} ℃`;
                        description.textContent = eleDescription;
                    }
                });
            })          
        });
}
function getLocationFailed() {
    alert("위치를 알 수 없어 정보를 불러올 수 없습니당");
}

navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationFailed);

// search
const searchForm = document.querySelector('#searchForm');
const iptLocation = searchForm.querySelector('#iptLocation');

const dashScroll = document.querySelector('#dashScroll');
const searchWeather = document.querySelector('#searchWeather');
const searchIcon = searchWeather.querySelector('.item-info__icon');
const searchTemperature = searchWeather.querySelector('.item-info__temperature');
const searchDesc = searchWeather.querySelector('.item-info__description');
const searchLocation = searchWeather.querySelector('.item-info__location');
const searchWind = searchWeather.querySelector('.item-info__wind span');
const searchHumidity = searchWeather.querySelector('.item-info__humidity span');
const searchCloud = searchWeather.querySelector('.item-info__cloud span');

let inputUrl = "";

function submitSearchInput(event) {
    event.preventDefault();
    let locationVal = iptLocation.value;

    iptLocation.value = "";

    inputUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationVal}&lang=kr&appid=${API_KEY}&units=metric`;

    if(typeof inputUrl != 'error') {
        function fetchWeather() {
            return fetch(inputUrl).
                then(response => response.json());
        };

        async function logWeather2() {
            try {
                let weather = await fetchWeather();

                const iconClass = iconChange[`${weather.weather[0].icon}`];
                
                searchIcon.innerHTML = `<i class="${iconClass}"></i>`;
                searchTemperature.textContent = `${weather.main.temp} ℃`;
                searchDesc.textContent = weather.weather[0].description;
                searchLocation.textContent = `${weather.name}, ${weather.sys.country}`;
                searchWind.textContent = weather.wind.speed;
                searchHumidity.textContent = weather.main.humidity;
                searchCloud.textContent = weather.clouds.all;

                dashScroll.classList.add('on');
                searchWeather.style.display = "block";
            } catch (error) {
                console.log(error);
                alert("해당 지역을 찾을 수 없습니당");
            }
        }
        logWeather2();
    }
}

searchForm.addEventListener('submit',submitSearchInput);

// air pollution api
const airpollutionUrl =  `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=37.5108&lon=127.0293&appid=${API_KEY}&units=metric&lang=kr`;