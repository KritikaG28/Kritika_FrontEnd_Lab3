const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/",
  units: "metric"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
  //ASCII value for enter key
  console.log(event.keyCode)
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(cityName) {
  console.log("city is ", cityName);
  const url = `${api.base}weather?q=${cityName}&units=${api.units}&appId=${api.key}`;
  console.log("url formed is:", url);
  fetch(url).then((response) => {
    console.log(response);
    return response.json()
  }).then((responseJson) => {
    console.log(responseJson)
    if (responseJson.cod === 200) {
      displayResults(responseJson);
    }
  })
    .catch((err) => {
      console.log("Error is ", err);
    })
}

function displayResults(responseJson) {
  //get country name from countrycode in responseJson 
  const countryName = new Intl.DisplayNames(
    ['en'], { type: 'region' }
  );

  const country = countryName.of(`${responseJson.sys.country}`);

  let city = document.querySelector('.city');
  city.innerText = `${responseJson.name}, ${country}`;

  let temperature = document.querySelector('.temp');
  temperature.innerHTML = `${responseJson.main.temp}°c`;

  let weather = document.querySelector('.weather');
  weather.innerHTML = responseJson.weather[0].main;

  let hiLow = document.querySelector('.hi-low');
  hiLow.innerHTML = `${responseJson.main.temp_min}°c / ${responseJson.main.temp_max}°c`;

  let now = new Date();
  let date = document.querySelector('.date');
  date.innerHTML = dateBuilder(now);
}

//create present date
function dateBuilder(date) {
  const dateOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long'
  }

  return date.toLocaleDateString("en-US", dateOptions)
}