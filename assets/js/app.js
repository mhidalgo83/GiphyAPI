$(document).ready(function () {
    //Array of topics, allow new topcs to be pushed into this array
    var topics = ['Steve Carell', 'Will Ferrell', 'Chris Farley', 'Nick Offerman'];
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
            if (topic === '') {
                return false;
            }
            topics.push(topic);
            displayGifButtons();
            return false;

        })
    }
    console.log(topics);
    displayGifButtons();
    newBtn();
    // Create a function that displays all of the gif
    function displayGif() {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=kOySTnvMI920lJbjeTYgvCU4j0NwgHG7=10";
        $.ajax({
            URL: queryURL,
            method: "GET"
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
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        // Stores rating in a variable...
                        var rating = results[i].rating;

                        // Creates div for gifs...
                        var gifDiv = $("<div>").addClass("gifDiv");

                        // Creates p for rating
                        var gifRating = $("<p>").text("Rating: " + rating);
                        gifDiv.append(gifRating);

                        // Topic gif
                        var topicImage = $("<img>");
                        topicImage.attr("src", results[i].image.fixed_height.url);
                        topicImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height_small.url);
                        topicImage.attr("data-state", "still");
                        topicImage.addClass("image");

                        //Appends all images to html...
                        gifDiv.append(gifRating);
                        gifDiv.append(topicImage);
                        $("#gifView").prepend(gifDiv);
                    }
                }
            })
    }
    // Call the functions & Methods
    displayGif();
});