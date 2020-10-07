$(document).ready(function() {
    var cityInput = $(".city-input");
    var subBtn = $(".city-submit");

    subBtn.click(function(event) {
        event.preventDefault();
        localStorage.setItem("city", cityInput.val());
    })
})