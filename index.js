const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const WeatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIkey = 'e9d172375d21694402dba91b7b1fe561';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                WeatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main.toLowerCase()) {
                case 'clear':
                    image.src = 'images/clear.png';
                    break;

                case 'clouds':
                    image.src = 'images/clouds.png';
                    break;

                case 'haze':
                    image.src = 'images/haze.png';
                    break;

                case 'rain':
                    image.src = 'images/rain.png';
                    break;

                case 'smoke':
                    image.src = 'images/smoke.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>*c/<span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = 'flex';
            WeatherDetails.style.display = 'flex';
            weatherBox.classList.add('fadeIn');
            WeatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
});
