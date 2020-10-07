$(document).ready(function() {
    var cityInput = $(".city-input");
    var subBtn = $(".city-submit");
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
    console.log(citiesArr);

    // This saves the city to search history
    subBtn.click(function(event) {
        event.preventDefault();
        localStorage.setItem(`cityNo${numCities}`, cityInput.val());
        numCities++;
    })
})