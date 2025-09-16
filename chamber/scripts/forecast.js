const fc0 = document.querySelector('#forecast0');
const fc1 = document.querySelector('#forecast1');
const fc2 = document.querySelector('#forecast2');
const fc1Name = document.querySelector('#d1');
const fc2Name = document.querySelector('#d2');

const d = new Date();
d.setDate(d.getDate() + 1);
const d1 = d.toLocaleDateString('en-CA', { weekday: 'long' });
fc1Name.innerHTML = `${d1}:`;

d.setDate(d.getDate() + 1);
const d2 = d.toLocaleDateString('en-CA', { weekday: 'long' });
fc2Name.innerHTML = `${d2}:`;


const urlf = 'https://api.openweathermap.org/data/2.5/forecast/daily?cnt=3&units=metric&lat=44.32&lon=-76.58&appid=5e6f16372cbfbd1a3f856949fa2c4c85';

async function apiFetchF() {
  try {
    const response = await fetch(urlf);
    if (response.ok) {
      const data = await response.json();
      //console.log(data); // testing only
      displayResultsF(data); // uncomment when ready
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetchF();

function displayResultsF(data) {
    fc0.innerHTML = `${data.list[0].temp.max}&deg;C / ${data.list[0].temp.min}&deg;C`;
    fc1.innerHTML = `${data.list[1].temp.max}&deg;C / ${data.list[1].temp.min}&deg;C`;
    fc2.innerHTML = `${data.list[2].temp.max}&deg;C / ${data.list[2].temp.min}&deg;C`;
}