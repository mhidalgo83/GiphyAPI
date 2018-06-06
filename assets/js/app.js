$(document).ready(function () {
    
    //Array of topics, allow new topcs to be pushed into this array
    var topics = [];
    // Create a function that displays all gif buttons
    function displayGifButtons() {
        $("#gifButton").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("topic");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButton").append(gifButton);
        }
    };

    
    // Create a function to add a new topic button
    function newBtn() {
        $("#addGif").on("click", function () {
            var topic = $("#topic-input").val().trim();
            if (topic === " ") {
                return false;
            }
            topics.push(topic);
            displayGifButtons();
            return false;

        })
    }

    displayGifButtons();
    newBtn();
    
    // Create a function that displays all of the gifs...
    function displayGif(){
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kOySTnvMI920lJbjeTYgvCU4j0NwgHG7&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .then(function (response) {
                //Empties old gifs...
                $("#gifView").empty();

                //Stores results from AJAX call...
                var results = response.data;

                if (results == '') {
                    alert("No gif for you!")
                }

                for (var i = 0; i < results.length; i++) {

                        // Stores rating in a variable...
                        var rating = results[i].rating;

                        // Creates div for gifs...
                        var gifDiv = $("<div>").addClass("gifDiv");

                        // Creates p for rating
                        var gifRating = $("<p>").text("Rating: " + rating);
                        gifDiv.append(gifRating);

                        // Topic gif
                        var topicImage = $("<img>");
                        topicImage.attr("src", results[i].images.fixed_height_small_still.url);
                        topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height_small.url);
                        topicImage.attr("data-state", "still");
                        topicImage.addClass("image");

                        //Appends all images to html...
                        gifDiv.append(topicImage);
                        $("#gifView").prepend(gifDiv);
                    
                }
            })
    }
    

    // Listeners...
    $(document).on("click", ".topic", displayGif);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});