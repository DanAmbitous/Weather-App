const inputCity = document.getElementById('input-city');
const inputCountry = document.getElementById('input-country');
const selectedTemperatureUnit = document.getElementById('temperature-units');
const data = document.getElementById('data');
const iconDescription = document.getElementById('icon-description');
const windUnits = document.getElementById('wind-units');

let selectedUnit;
let unitSign;

let countryAbbreviated = `${inputCountry.value.split('').join('.')}.`

let windSpeedUnit;

let unitMeasurement = (data) => {
  if (windUnits.value === 'meters-seconds') {
    console.log('m/s');
    windSpeedUnit = `${data.wind.speed} m/s`
  } else if (windUnits.value === 'miles-hours') {
    console.log('mph');
    windSpeedUnit = `${data.wind.speed * 2.23694} mph`
  }
}

if (selectedTemperatureUnit.value === 'celsius') {
  selectedUnit = 'units=metric';
  unitSign = '°C';
} else if (selectedTemperatureUnit.value === 'fahrenheit') {
  selectedUnit = 'units=imperial';
  unitSign = '°F';
} else {
  selectedUnit = 'units=kelvin';
  unitSign = '°K';
}

let link = 'http://api.openweathermap.org/data/2.5/weather?q=';
let cityName = inputCity.value;
let countryAbbreviation = inputCountry.value;
let apiKey = 'APPID=469f04c0b3bc1ee6ca83abdfb8c7e6d3';
let temperatureUnit = selectedUnit;

let apiLink = `${link}${cityName},${countryAbbreviation}&${apiKey}&${temperatureUnit}`;

document.addEventListener('click', (event) => {
  let activated = event.target.id;

  switch(activated) {
    case 'submit':
      cityName = inputCity.value;
      countryAbbreviation = inputCountry.value;

      countryAbbreviated = `${countryAbbreviation.split('').join('.')}.`

      unitMeasurement = (data) => {
        if (windUnits.value === 'meters-seconds') {
          windSpeedUnit = `${data.wind.speed} m/s`
        } else {
          windSpeedUnit = `${data.wind.speed * 2.23694} mph`
        }
      }
    
      if (selectedTemperatureUnit.value === 'celsius') {
        selectedUnit = 'units=metric';
        unitSign = '°C';
      } else if (selectedTemperatureUnit.value === 'fahrenheit') {
        selectedUnit = 'units=imperial';
        unitSign = '°F';
      } else {
        selectedUnit = 'units=kelvin';
        unitSign = '°K';
      }

      let temperatureUnit = selectedUnit;

      if (inputCity.value.length === 0) {
        inputCity.value = 'london';
      } 

      apiLink = `${link}${cityName},${countryAbbreviation}&${apiKey}&${temperatureUnit}`;

      apiUrl(apiLink);
      break;
  }
})

document.addEventListener('keyup', (event) => {
  let key = event.key;

  switch(key) {
    case 'Enter':
      cityName = inputCity.value;
      countryAbbreviation = inputCountry.value;

      countryAbbreviated = `${countryAbbreviation.split('').join('.')}.`

      unitMeasurement = (data) => {
        if (windUnits.value === 'meters-seconds') {
          windSpeedUnit = `${data.wind.speed} m/s`
        } else {
          windSpeedUnit = `${data.wind.speed * 2.23694} mph`
        }
      }
    
      if (selectedTemperatureUnit.value === 'celsius') {
        selectedUnit = 'units=metric';
        unitSign = '°C';
      } else if (selectedTemperatureUnit.value === 'fahrenheit') {
        selectedUnit = 'units=imperial';
        unitSign = '°F';
      } else {
        selectedUnit = 'units=kelvin';
        unitSign = '°K';
      }

      let temperatureUnit = selectedUnit;

      if (inputCity.value.length === 0) {
        inputCity.value = 'london';
      } 

      apiLink = `${link}${cityName},${countryAbbreviation}&${apiKey}&${temperatureUnit}`;

      apiUrl(apiLink);
      break;
  }
})

const dataSection = (data) => {
  let cityCapitalized = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  console.log(windSpeedUnit);

  document.getElementById('city-data').textContent = cityCapitalized;
  document.getElementById('country-data').textContent = data.sys.country;
  document.getElementById('temperature-data').textContent = `Temperature: ${data.main.temp}${unitSign}`;
  document.getElementById('minimum-data').textContent = `Minimun: ${data.main.temp_min}${unitSign}Maximum: `;
  document.getElementById('minimum-data').textContent = `Maximum: ${data.main.temp_max}${unitSign}`;
  document.getElementById('feels-data').textContent = `Feels Like: ${data.main.feels_like}${unitSign}`;
  document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById('humidity').textContent = `Pressure: ${data.main.pressure} hPa`;
  document.getElementById('wind').textContent = windSpeedUnit;
  document.getElementById('longitud-data').textContent = `Longitud: ${data.coord.lon}`;
  document.getElementById('latitud-data').textContent = `Latitud: ${data.coord.lat}`;
}

const iconShower = (data) => {
  let icon = data.weather[0].icon;

  let iconLocation = document.getElementById('weather-icon');
  iconLocation.innerHTML = `<img src="icons/${icon}.png"></img>`

  iconDescription.textContent = data.weather[0].description;
}

const validateResponse = response => {
  if (!response.ok) {
    throw `Error message with the status code ${response.statusText}`
  }

  return response;
}

const jsonification = responseValidator => {
  return responseValidator.json();
}

const logResolve = responseObject => {
  chartWeather(responseObject);
  dataSection(responseObject);
  iconShower(responseObject);
  unitMeasurement(responseObject);
}

const logReject = error => {
  console.log(error);

  alert(`Can't find city of ${cityName} in ${countryAbbreviated}`);
}

const apiUrl = respones => {
  fetch(respones)
    .then(validateResponse)
    .then(jsonification)
    .then(logResolve)
    .catch(logReject)
}

apiUrl(apiLink);

let apiData;

const chartWeather = (data) => {
  apiData = data;

  const ctx = document.getElementById('weather-information').getContext('2d');

  if (window.chart !== undefined) 
  window.chart.destroy(); 
  window.chart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Temperature', 'Minimum Temperature', 'Maximum Temperature', 'Feels Like'],
          datasets: [{
              label: `Weather of ${cityName}`,
              data: [apiData.main.temp, apiData.main.temp_min, apiData.main.temp_max, apiData.main.feels_like],
              backgroundColor: [
                'rgba(0, 204, 153, 0.5)', 'rgba(2, 133, 255, 0.5)', 'rgba(241, 72, 72, 0.5)', 'rgba(229, 255, 0, 0.5)'
              ],
              borderColor: [
                  '#00664d', '#1a5588', '#681b1b', '#165a21',  '#2db844'
              ],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                callback: (value, index, values) => {
                  // console.log(value, index, values);
                  return `${value}${unitSign}`;
                }
              }
            }  
          ]
        },
        tooltips: {
          callbacks: {
            label: (item) => `${item.yLabel}${unitSign}`,
          },
        }
      }
  });
}

// 'http://api.openweathermap.org/data/2.5/weather?q=london&APPID=469f04c0b3bc1ee6ca83abdfb8c7e6d3&units=metric'