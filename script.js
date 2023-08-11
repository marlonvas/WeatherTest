// almacena la clave y la URL de la API del clima
const api ={
    key:'fa81af32c127471c139424b47b42a2f4',
    url:`https://api.openweathermap.org/data/2.5/weather`
}
// Referenciamos los elementos del DOM
const city = document.getElementById('city');
const date= document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const temp= document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');


// Función para actualizar las imágenes de temperatura
function updateImages(data){

    const temp = toCelsius(data.main.temp);
    let src ='img/temp-mid.png';
    if(temp > 26){
        src = 'img/temp-high.png';
    }else if (temp < 20){
        src = 'img/temp-low.png'
    }
    tempImg.src = src;
}
// Función asincrónica para buscar datos climáticos según  consulta
async function search(query){
  try {
    const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
    const data = await response.json();
    
    city.innerHTML = `${data.name}, ${data.sys.country}`;
    data.innerHTML = (new Date()).toLocaleDateString();
    temp.innerHTML = `${toCelsius(data.main.temp)}c`;
    weather.innerHTML = data.weather[0].description;
    range.innerHTML = `${toCelsius(data.main.temp_min)}c / ${toCelsius(data.main.temp_max)}c`;
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    showLocationOnMap(lat, lon);
    updateImages(data);
  } catch (err) {
    console.log(err)
    alert('Debes Ingresar Una ciudad Valida')
  }


}
// Función para convertir Kelvin a Celsius
function toCelsius(kelvin){
    return Math.round(kelvin -273.15);
}
// Función para manejar el evento de clic en el botón de búsqueda
function onclick(event){
    event.preventDefault();
    search(searchbox.value);
}
// Función para manejar el evento de clic en el botón de borrado
function borrarInput(event) {
    event.preventDefault();
    borrarInput(); 
    search(searchbox.value);
}

//funcion para  ubicar la ciudad en el mapa
function showLocationOnMap(lat, lon) {
    map.setView([lat, lon], 10); // Establece la vista del mapa en la ubicación
    L.marker([lat, lon]).addTo(map); // Agrega un marcador en la ubicación
}

// Referencias a elementos del DOM para el formulario, el campo de búsqueda y el botón de borrado
const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
const searchdelete = document.getElementById('search-delete');

// Agregamos escuchadores de eventos para los clics en el formulario 
searchform.addEventListener('click',onclick,true);
const mapDiv = document.getElementById('map');

//se agrega para renderizar mapa y cordenadas por defecto
let map = L.map('map').setView([4.639386,-74082412],2)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);