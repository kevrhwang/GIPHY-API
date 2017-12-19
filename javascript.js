//starter array that will have buttons when page loads
var actors = ["Arnold Schwarzenegger", "The Rock", "Jackie Chan", "Keanu Reeves", "Morgan Freeman", "Adam Sandler", "Jim Carrey",
"Jonah Hill", "Nicholas Cage", "Jack Nicholson", "Jennifer Lawrence", "Jack Black", "Dave Chappelle", "Megan Fox"];

//function that takes in elements in actors array and converts them to buttons on page
function renderButtons() {
	$("#actor-buttons").empty();

	for (var i = 0; i < actors.length; i++) {
		var button = $("<button>");

		button.addClass("actor");
		button.attr("data-name", actors[i]);
		button.html(actors[i]);
		$("#actor-buttons").append(button);
	}
} 

//when add button clicked, adds user inputted actor and pushes to actors array
//renderButtons function called to generate buttons at top of page and input text box is cleared
$("#add-actor").on("click", function(event) {
	event.preventDefault();

	if ($("#user-input").val().trim()) {
		var newActor = $("#user-input").val().trim();
		actors.push(newActor);
		renderButtons();
		$("#user-input").val('');
	}
});

//render initial buttons at top of page
renderButtons();

//function to retrieve image and attributes from GIPHY API and place them inside a new div that is appended to page
function displayGifs() {
	$("#gifs").empty();
	var actor = $(this).attr("data-name");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
  	var results = response.data;

  	for (var i = 0; i < results.length; i++) {
  		var gifDiv = $("<div class='gif-container'>");
  		var rated = results[i].rating;

  		var header = $("<h4>").html("Rated: " + rated.toUpperCase());

  		var actorImg = $("<img class='start-stop'>");
  		actorImg.attr("src", results[i].images.fixed_height_still.url);
  		actorImg.attr("data-still", results[i].images.fixed_height_still.url);
  		actorImg.attr("data-animate", results[i].images.fixed_height.url);
  		actorImg.attr("data-state", "still");



  		// gifDiv.append(header);
  		gifDiv.append(actorImg);
  		gifDiv.append(header);

  		$("#gifs").prepend(gifDiv);
  	}

  });
}

//on click of actor buttons, displayGif function is called
$(document).on("click", ".actor", displayGifs);

//function to animate a still gif and stop an animated gif
$(document).on("click", ".start-stop", function() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else if (state === "animate") {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
})

