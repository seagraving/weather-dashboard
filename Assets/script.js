
        // global script variables
        var loc = $("#loc")
        var temp = $("#temp")
        var wind = $("#wind")
        var humidity = $("#humidity")


        //my apikey for the website 
        var apiKey = "186fe6305fa430242057e36b2d62e0f7";
        $(document).ready(
            //click function for the api to get current and 5day forecast
            $("#submitSearch").on("click", function (e) {
                e.preventDefault()
                var userSearch = $("#citySearch").val()
                var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}`;
                var fivedayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&appid=${apiKey}`;
                // $.get(apiUrl, function (res, status) {
                //     console.log(res);
                // })
                $.ajax({
                    url: apiUrl,
                    // retrieve each of these elements to display in jumbotron
                }).done(function (res) {
                    console.log(res);
                    console.log(res.name);
                    console.log(res.main.temp);
                    console.log(res.wind.speed);
                    console.log(res.main.humidity);

                    loc.text(res.name)
                    temp.text(res.main.temp)
                    wind.text(res.wind.speed)
                    humidity.text(res.main.humidity)
                    var lat = (res.coord.lat)
                    var lon = (res.coord.lon)


                    // converts the temp to fahrenheit with the below formula
                    var tempF = ((res.main.temp - 273.15) * 1.80 + 32).toFixed(2);
                    
                    $("#tempF").text("Fahrenheit " + tempF);

                    //need to make something to retrieve UV index using lat and lon from apiUrl
                    var uvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;

                    $.ajax({
                        url: uvUrl,
                        method: "GET"

                    }).then(function (response){
                        console.log(response);

                        var uvIndex = (response.value);
                        $("#uvIndex").text(uvIndex);
                    })

                });



                // another call for five-day forecast
                $.ajax({
                    url: fivedayUrl,

                }).done(function (res) {
                    console.log(res);

                    var day = res.list[0];
                    makeCard(day);
                    


                });
                //create a card for the elements?
                // function makeCard(day) {
                //     var div = $("<div>")
                //     // var date = $("<p>")
                //     var temperature = $("<p>").text(day.main.temp)
                //     var wind = $("<p>").text(day.wind.speed)
                //     var humidity = $("<p>").text(day.main.humidity)
                //     div.append(temperature, wind, humidity)
                //     $("#forecast").append(div)

                    

                    
                // }
            })
        )
