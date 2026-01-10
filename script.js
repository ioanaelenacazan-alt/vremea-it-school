const apiKey = "71333d16fb93ad53fd08a8f01096bb65";

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

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

      const { name, dt, main, weather } = data;

      const day = getDayOfTheWeek(dt);
      const hours = getHour(dt);

      const temperature = Math.round(main.temp);
      const realFeel = Math.round(main.feels_like);

      const weatherDescription = weather[0].description;

      const weatherIcon = getWeatherIcon(weather[0].icon);

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

      const { city, cnt, list } = data;
      console.log(list, "hello");
      console.log(data, "bye");
      const { main, dt, weather } = list;

      const daysMap = {};

      list.forEach((listItem) => {
        const day = getDayOfTheWeek(listItem.dt);

        if (daysMap[day]) {
          daysMap[day].push(listItem);
        } else {
          daysMap[day] = [listItem];
        }
      });

      let weatherForecastContainer =
        document.querySelector(".weather-forecast");
      weatherForecastContainer.innerHTML = "";
      Object.keys(daysMap).forEach((daykey) => {
        const days = daysMap[daykey];
        console.log(days, "Days array", daykey);
        weatherForecastContainer.innerHTML += `<h3 class="text-primary">${daykey}</h3>`;

        days.forEach((day) => {
          const weatherIcons = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          weatherForecastContainer.innerHTML += `   
<div class="weather-forecast-box w-100 d-flex justify-content-between align-items-center border rounded p-3 mb-3">
              <div>${getHour(day.dt)}</div>
              <div><img src="${weatherIcons}" alt=""></div>
              <div class="fs-3"><strong>${Math.round(
                day.main.temp
              )}</strong></div>
              <div>${day.weather[0].description}</div>
              <div class="real-feel">Real feel: <strong>${Math.round(
                day.main.feels_like
              )}</strong></div>
            </div>
                      `;
        });
      });
    });
}
