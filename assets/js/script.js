var apiKey = '4db674b8f49814db2b9ea15729fac8ea'
var searchButton = document.querySelector('.city-submit')
var searchTerm = document.querySelector('input')

function getLatLong(city) {
    var lat
    var long

    fetch ('https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial&appid=4db674b8f49814db2b9ea15729fac8ea').then(function(response) {
    response.json()
    .then(function(data){
        console.log(data)
        console.log('a')
        lat = data.coord.lat.toString()
        long = data.coord.lon.toString()
        console.log(lat)
        console.log(long)

        getWeatherData(lat, long)
    })
  })
}

function getWeatherData (lat, long) {
    fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly,minutely&units=imperial&appid=' + apiKey).then(function(response) {
    response.json()
    .then(function(data){
        console.log(data)
        console.log('b')
    })
  })
}

searchButton.addEventListener('click', function getCity() {
    var city = searchTerm.value
    console.log (city)
    getLatLong(city)
})
