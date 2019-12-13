// Recipes Page
$(document).ready(function() {

// Food Recipe Ajax Call:
var apiKey = "05e8620a0264437bb9d81bca51284a17";
var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + searchValue + "&apiKey=" + apiKey;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    console.log(response);
    //empties out dynamically created elements from previous search
    $("#results").empty();
    // for loop over the array to populate data
    for (let i = 0; i < response.length; i ++) {
        //Creates a new div
        let newDiv= $("<div>");
        // Creates new h4 t display the recipe's title
        let recipeTitle = $("<h5>"  + response[i].title + "</h5>");
        // creates a p tag with forcasted temperature
        let ingredientsUsed = $("<p>This will use " + response[i].usedIngredientCount + " of your ingredients!</p>")
        //add classes to the element
        // recipeTitle.addClass("card-title text-center marginTop");
        //add class to the ingredient element
        // ingredientsUsed.addClass("card-text");
        // Creates an img tag to display the forcast icon
        let recipeImg = $("<img>");
        // Creates a src url for the img element
        recipeImg.attr("src", response[i].image);
        //Adds a class (with img width and height) to the img element
        // recipeImg.addClass("card-img");
        //adds classes to the div element to style
        // newDiv.addClass("");
        //Appends all the different elements to the div
        newDiv.append(recipeTitle);
        newDiv.append(ingredientsUsed);
        newDiv.append(recipeImg);
        // Appends the div to the appropriate id on the page
        $("#results").append(newDiv);
    }
})
});

