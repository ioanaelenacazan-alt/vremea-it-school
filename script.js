const apiKey = "x";

function updateCity(city) {
  displayCurrentWeather(city);
  displayCurrentForecast(city);

  console.log("Am selectat orasul, city", city);
  const cityElement = document.getElementById("bigCity");
  cityElement.innerHTML = city;
}
function displayCurrentWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ro`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const { name, dt, main, weather, wind } = data;

      const day = getDayOfTheWeek(dt);
      const hours = getHour(dt);

      const temperature = Math.round(main.temp);
      const realFeel = Math.round(main.feels_like);

      const weatherDescription = weather[0].description;

      const weatherIcon = getWeatherIcon(weather[0].icon);
      // const windSpeed = Math.round(windToKmPerHour(wind.speed));

      let currentWeatherContainer = document.querySelector(".current-weather");
      currentWeatherContainer.innerHTML = `
        <div class="px-3">
          <div class="fs-2 mb-2"><strong>${name}</strong></div>
          <div class="fs-4"><strong>${day}</strong>, ${hours}</div>
          <div class="d-flex align-items-center justify-content-center">
            <strong class="fs-1">${temperature}°C</strong>
            <img src="${weatherIcon}" />
          </div>
        </div>
        <div class="px-3">
          <p class="fs-5">Real feel: <strong>${realFeel}°C</strong></p>
          <p class="fs-5 text-capitalize">${weatherDescription}</p>
        
        </div>
      `;
    });
}
function getDayOfTheWeek(timestampSeconds) {
  const d = new Date(timestampSeconds * 1000);
  const days = [
    "Duminică",
    "Luni",
    "Marți",
    "Miercuri",
    "Joi",
    "Vineri",
    "Sâmbătă",
  ];
  return days[d.getDay()];
}

function getHour(dt) {
  const date = new Date(dt * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}

function getHour(timestampSeconds) {
  const d = new Date(timestampSeconds * 1000);
  return d.toLocaleTimeString("ro-RO", { hour: "2-digit", minute: "2-digit" });
}

function getWeatherIcon(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function displayCurrentForecast(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=ro`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const { name, dt, main, weather, wind } = data;

      const day = getDayOfTheWeek(dt);
      const hours = getHour(dt);

      const temperature = Math.round(main.temp);
      const realFeel = Math.round(main.feels_like);

      const weatherDescription = weather[0].description;

      const weatherIcon = getWeatherIcon(weather[0].icon);
      // const windSpeed = Math.round(windToKmPerHour(wind.speed));

      let weatherForecastContainer = document.querySelector(".weather-forecast");
      weatherForecastContainer.innerHTML = `
          <div class="col text-center">
            <p><strong>${day}</strong></p>
            <img src="${icon}" />
            <p>${temp}°C</p>
          </div>
        `;

   
      ;
    });
}