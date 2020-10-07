$(document).ready(function() {
    var cityInput = $(".city-input");
    var subBtn = $(".city-submit");
    var cityList = $(".show-cities");
    var curWeather = $(".current-weather");
    // Makes the list of cities to print out from local storage
    var numCities = 0;
    var citiesArr = [];
    var newCityCheck = true;
    while (newCityCheck) {
        var makeCity = localStorage.getItem(`cityNo${numCities}`);
        if (makeCity == null) {
            newCityCheck = false;
        } else {
            citiesArr.push(makeCity);
            numCities++;
        }
    }

    // Displays all the cities
    function displayCities() {
        cityList.empty();
        for (var i = citiesArr.length; i > 0; i--) {
            var liTag = $("<li>");
            var button = $("<button>");
            button.attr("style", "width: 150px");
            button.addClass("city-button");
            button.text(citiesArr[i - 1]);
            liTag.append(button);
            cityList.append(liTag);
        }
    }

    // Displays the weather
    function displayWeather(cityDisplaying) {
        // Makes sure it won't double display
        curWeather.empty();
        
        // My key is "d9131680735a7b4b06edce9e340f8e49" for when it works
        var APIkey = "da3b420f1e1dfac228712750d83221b3";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityDisplaying.toLowerCase() + "&appid=" + APIkey;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            curWeather.empty();
            console.log(response);
            // Gets date using the UNIX timestamp
            var date = new Date((response.sys.sunrise * 1000));
            // The name it'll show (which includes date)
            var name = cityDisplaying + " " + date.toLocaleDateString();
            // To show the icon for the weather
            var weatherIco = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            // Displays the name
            var showName = $("<h1>");
            showName.text(name);
            showName.append(weatherIco);
            curWeather.append(showName);

            // Gets temperature, converts to fahrenheit
            var tempKelv = response.main.temp;
            var tempFar = Math.floor((tempKelv - 273.15) * 9 / 5 + 32);
            // Displays temperature
            var temp = $("<p>").text("Temperature: " + tempFar + " F");
            curWeather.append(temp);

            // Gets humidity and displays it
            var humidity = response.main.humidity;
            var showHumidity = $("<p>").text("Humidity: " + humidity + "%")
            curWeather.append(showHumidity);

            // Gets wind speed and displays it
            var windSpeed = response.wind.speed;
            var showWind = $("<p>").text("Wind speed: " + windSpeed + " MPH");
            curWeather.append(showWind);
          })
    }

    // Displays all cities at first and a default weather area
    displayCities();
    if (citiesArr.length > 0) {
        displayWeather(citiesArr[citiesArr.length -1]);
    }

    // This saves the city to search history
    subBtn.click(function(event) {
        event.preventDefault();
        var newCity = cityInput.val();
        if (newCity.length > 0) {
            localStorage.setItem(`cityNo${numCities}`, newCity);
            citiesArr.push(newCity);
            cityInput.val("");
            numCities++;
            displayWeather(newCity);
            displayCities();
        }
    });

    // Displays this cities weather when its button is clicked
    cityList.on("click", function(event) {
        event.preventDefault();
        displayWeather(event.target.textContent);
    });
})