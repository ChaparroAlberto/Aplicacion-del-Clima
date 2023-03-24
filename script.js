let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  //Si el input esta vacio
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Se te olvido poner una ciudad</h3>`;
  }
  //Si el input no esta vacio
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    //Limpiar el input
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      //Si la ciudad es valida
      .then((data) => {
        console.log(data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.weather[0].description);
        console.log(data.name);
        console.log(data.main.temp_min);
        console.log(data.main.temp_max);
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <h4 class="temp2">Pero temblamos con ${data.main.feels_like}&#176;</h4>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;</h4>
            </div>
        </div>
        `;
      })
      //Si la ciudad no es valida
      .catch(() => {
        result.innerHTML = `<h3 class="msg">No se encuentra esa ciudad</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);