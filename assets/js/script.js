$(document).ready(function() {
    var cityInput = $(".city-input");
    var subBtn = $(".city-submit");
    var cityList = $(".show-cities");
    // Makes the list of cities to print out from local storage
    var numCities = 0;
    var citiesArr = [];
    var newCity = true;
    while (newCity) {
        var makeCity = localStorage.getItem(`cityNo${numCities}`);
        if (makeCity == null) {
            newCity = false;
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
            liTag.text(citiesArr[i]);
            cityList.append(liTag);
        }
    }

    displayCities();

    // This saves the city to search history
    subBtn.click(function(event) {
        event.preventDefault();
        localStorage.setItem(`cityNo${numCities}`, cityInput.val());
        citiesArr.push(cityInput.val());
        numCities++;
        displayCities();
    })
})