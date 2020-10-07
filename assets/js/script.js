$(document).ready(function() {
    var cityInput = $(".city-input");
    var subBtn = $(".city-submit");
    var cityList = $(".show-cities");
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
        for (var i = 0; i < citiesArr.length; i++) {
            var liTag = $("<li>");
            var button = $("<button>");
            button.attr("style", "width: 150px");
            button.addClass("city-button");
            button.text(citiesArr[i]);
            liTag.append(button);
            cityList.append(liTag);
        }
    }
    displayCities();

    function displayWeather(cityDisplaying) {

        // My key is "d9131680735a7b4b06edce9e340f8e49" for when it works
        var APIkey = "da3b420f1e1dfac228712750d83221b3";
        var city = cityDisplaying.toLowerCase();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function (response) {
            console.log(response);
          })
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
            displayCities();
            displayWeather(newCity); 
        }
    });

    $(".city-button").click(function(event) {
        displayWeather($(this).text());
    });
})