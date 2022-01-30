var apiKey = '4db674b8f49814db2b9ea15729fac8ea'
var searchButton = document.querySelector('.city-submit')
var searchTerm = document.querySelector('input')
var weatherDisplay = document.querySelector('.weather-display')
var futureCardDisplay = document.querySelector('.future-cards')
var cities = []


function getLatLong(city) {
    var lat
    var long

    fetch ('https://api.openweathermap.org/data/2.5/weather?q=' + city +'&units=imperial&appid=4db674b8f49814db2b9ea15729fac8ea').then(function(response) {
    if (response.ok) {
        response.json()
        .then(function(data){

            lat = data.coord.lat.toString()
            long = data.coord.lon.toString()

            getWeatherData(lat, long)
        })
    } else {
        alert ('Sorry, this city is not found.')
    }
    
  })
}

function getWeatherData (lat, long) {
    fetch ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly,minutely&units=imperial&appid=' + apiKey).then(function(response) {
    response.json()
    .then(function(data){

        displayCurrentWeatherData(data)
        displayFutureWeatherData(data)
    })
  })
}

function displayCurrentWeatherData (data) {

    var date = moment().format('MMM Do YYYY')
    var city = document.createElement('h3')
    city.textContent = (searchTerm.value + ' (' + date + ')').toUpperCase()

    var temp = document.createElement('p')
    temp.textContent = ('Temp: ' + data.current.temp + '°F')

    var wind = document.createElement('p')
    wind.textContent = ('Wind: ' + data.current.wind_speed + ' MPH')

    var humidity = document.createElement('p')
    humidity.textContent = ('Humidity: ' + data.current.humidity + '%')

    var uvNumber = document.createElement('span')
    uvNumber.textContent = data.current.uvi
    if (data.current.uvi <= 3) {
        uvNumber.classList='bg-success rounded'
    } else if (data.current.uvi <=8) {
        uvNumber.classList='bg-warning rounded'
    } else if (data.current.uvi >8) {
        uvNumber.classList='bg-danger rounded'
    }

    var uv = document.createElement('p')
    uv.textContent = ('UV Index: ')

    console.log(city, temp, wind, humidity, uvNumber)
    uv.appendChild(uvNumber)
    weatherDisplay.appendChild(city)
    weatherDisplay.appendChild(temp)
    weatherDisplay.appendChild(wind)
    weatherDisplay.appendChild(humidity)
    weatherDisplay.appendChild(uv)
}

function displayFutureWeatherData (data) {
    console.log(data)
    date = moment().format('MM/d/YYYY')
    console.log(date)
    futureCardDisplay.textContent = ''
    // console.log(test)

    for (i=0; i<=4; i++) {
       var container = document.createElement('div')
       container.classList = 'future-card'
       var day = document.createElement('h4')
       day.textContent = date

       var temp = document.createElement('p')
       temp.textContent = ('Temp: ' + data.daily[i].temp.day + '°F')

       var wind = document.createElement ('p')
       wind.textContent = ('Wind: ' + data.daily[i].wind_speed + ' MPH')

       var humidity = document.createElement ('p')
       humidity.textContent = ('Humidity: ' + data.daily[i].humidity + '%')

       container.appendChild(day)
       container.appendChild(temp)
       container.appendChild(wind)
       container.appendChild(humidity)

       futureCardDisplay.appendChild(container)
    }
}

function store

searchButton.addEventListener('click', function getCity() {
    weatherDisplay.textContent = ''
    var city = searchTerm.value
    console.log (city)
    getLatLong(city)
})
