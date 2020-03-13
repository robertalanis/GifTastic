$(document).ready(function() {

    // Initial Buttons
    var array = ["Cardi B", "City Girls", "Kali Uchis", "Nicki Minaj", "Normani"];
    
    // Create Buttons
    function renderButtons() {
        for (var i = 0; i < array.length; i++) {
            var button = $("<button>");
            button.html(array[i]);
            button.addClass("button btn btn-outline-light");
            button.attr("data-name", array[i]);
            $("#buttondiv").append(button);
        }
    }
    
    // Add new buttons
    $("#addButton").on("click", function() {
        event.preventDefault();
        var newButton = $("#userInput").val();
        array.push(newButton);
        $("#buttondiv").empty();
        renderButtons();
    })
    
    // click event for movie button
    $("#buttondiv").on("click", ".button", function() {
      
    
        // Set up API
        var apiKey = "yNfwlOdzfqd7ZHiEEqtcE3UiU8BQ2GDN"
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-name") + "&limit=10&api_key=" + apiKey;
        console.log(queryURL);

        // AJAX call to GIPHY
        $.ajax({
            url:queryURL,
            method: "GET"
        }).done(function(response){
    
            var results = response.data;
            console.log(results);
    
            //loop through the results
            for (var i = 0; i < results.length; i++) {

                // Div for each GIF
                var div = $("<div>");
                // Image for each GIF
                var img = $("<img>");
                // Rating for each GIF
                var p = $("<p>");
                p.html("Rating: " + results[i].rating.toUpperCase());

                // Assign still and animated states to each GIF
                img.attr("src", results[i].images.fixed_height_still.url);
                img.attr("data-still", results[i].images.fixed_height_still.url);
                img.attr("data-animate", results[i].images.fixed_height.url);
                img.attr("data-state", "still");
                img.addClass("imgClick");
                
                // Place GIF, rating, 
                div.append(img);
                div.append(p);
                div.addClass("gif-div");
                $("#gifdiv").prepend(div);
            }
        })
    })
    
    //change state of giphy and animate when clicked
    $("#gifdiv").on("click", ".imgClick", function() {
    
        var state = $(this).attr("data-state");
    
        if(state === "still") {
           var animate = $(this).attr("data-animate");
            //change giphy link to the one to animate
            $(this).attr("src", animate);
            //change state of giphy to animate
            $(this).attr("data-state", "animate");
        } else {
            var still = $(this).attr("data-still");
            //change giphy link to the one that is still
            $(this).attr("src", still);
            //change state of giphy to animate
            $(this).attr("data-state", "still");
        }
    
    })

    renderButtons();
    console.log("Hello World!");

    })