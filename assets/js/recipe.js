// Recipes Page
$(document).ready(function() {

// Food Recipe Ajax Call:

// var searchResults;

// We immediately call food, when we come to this page
    // callFood()

// Populate results from our food recipe function when this button is clicked
$("#foodBtn").on("click", function(){
    callFood()
});

// Populate results from our drink recipe function when this button is clicked
$("#drinkBtn").on("click", function(){
    callDrink()
});

function callFood () {
    var textValueStorage = localStorage.getItem("searchValue");
    console.log(textValueStorage);

    var apiKey = "05e8620a0264437bb9d81bca51284a17";
    var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + textValueStorage + "&apiKey=" + apiKey;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        // searchResults = response;
        document.location.href = "recipe.html";

        //empties out dynamically created elements from previous search
        // $("#results").empty();
        // for loop over the array to populate data
        for (let i = 0; i < response.length; i ++) {
            
            //Creates a new div
            let newDiv= $("<div>");
            // Creates new h4 t display the recipe's title
            let recipeTitle = $("<h5>"  + response[i].title + "</h5>");
            // creates a p tag with forcasted temperature
            let ingredientsUsed = $("<p>This will use " + response[i].usedIngredientCount + " of your ingredients!</p>")
            //add classes to the element
            recipeTitle.addClass("card-title text-center marginTop");
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
};


function callDrink () {

    var textValueStorage = localStorage.getItem("searchValue")
    console.log(textValueStorage);
    
    var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + textValueStorage;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var drinks = response.drinks
        console.log(drinks);

        //empties out dynamically created elements from previous search
        $("#results").empty();
        // for loop over the array to populate data
        for (let i = 0; i < drinks.length; i ++) {
            console.log(i);
                //Creates column div
                let secondDiv= $("<div>");
                secondDiv.addClass("col s12 m4");
                    // creates the card div
                    let thirdDiv= $("<div>");
                    thirdDiv.addClass("card");
                        // creates an image div
                        let fourthDiv= $("<div>");
                        fourthDiv.addClass("card-image");
                        let drinkImg = $("<img>");
                        // Creates a src url for the img element
                        drinkImg.attr("src", drinks[i].strDrinkThumb);
                    // creates a text div (where our title goes)
                    let fifthDiv= $("<div>");
                    fifthDiv.addClass("card-content");
                        // Creates drink text
                        let drinkTitle = $("<h5>"  + drinks[i].strDrink + "</h5>");
                    let sixthDiv= $("<div>");
                    sixthDiv.addClass("card-action");
                    // let firstAnchor = $("<a>" + response[i].);

            // Appends the div to the appropriate id on the page
            // thirdDiv.append(sixthDiv);
            fifthDiv.append(drinkTitle);
            // thirdDiv.append(fifthDiv);
            fourthDiv.append(drinkImg);
            thirdDiv.append(fourthDiv);
            thirdDiv.append(fifthDiv);
            thirdDiv.append(sixthDiv);
            secondDiv.append(thirdDiv);
            $("#results").append(secondDiv);
        }
    })
};

});

