const currentTemp = document.querySelector('#wx-temp');
const feelsTemp = document.querySelector('#wx-feel');
const humidity = document.querySelector('#wx-hum');
const sunrise = document.querySelector('#wx-rise');
const sunset = document.querySelector('#wx-set');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#wx-cond');

const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=44.32&lon=-76.58&appid=5e6f16372cbfbd1a3f856949fa2c4c85';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      //console.log(data); // testing only
      displayResults(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

function formatTime(time) {
  const date = new Date(time * 1000);

  return date.toLocaleTimeString('en-CA', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}

function displayResults(data) {
  currentTemp.innerHTML = `${data.main.temp}&deg;C`;
  feelsTemp.innerHTML = `${data.main.feels_like}&deg;C`;
  humidity.innerHTML = `${data.main.humidity}%`;
  sunrise.innerHTML = `${formatTime(data.sys.sunrise)}`;
  sunset.innerHTML = `${formatTime(data.sys.sunset)}`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  let desc = data.weather[0].main;
   weatherIcon.setAttribute('src', iconsrc);
   weatherIcon.setAttribute('alt', data.weather[0].description);
  captionDesc.textContent = `${desc}`;
}