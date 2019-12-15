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
    // getDrinkRecipe("12914")
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
            // console.log(i);       
                let drinkCardDiv= $("<div>");
                drinkCardDiv.addClass("col s12 l6");
                    // creates the card div
                    let imgCardDiv= $("<div>");
                    imgCardDiv.addClass("card");
                        // creates an image div
                        let imgDiv= $("<div>");
                        imgDiv.addClass("card-image waves-effect waves-block waves-light");
                        //creates an html img tag
                        let drinkImg = $("<img>");
                        // Creates a src url for the img element
                        drinkImg.attr("src", drinks[i].strDrinkThumb);
                        //adds a class to the drink image
                        drinkImg.addClass("activator")
                    // creates a text div (where our title goes)
                    let drinkTitleDiv= $("<div>");
                    drinkTitleDiv.addClass("card-content");
                        //adds a span element to the drink div
                        let titleDivSpan = $("<span>");
                        titleDivSpan.addClass("card-title grey-text text-darken-4");
                        //adds "more vert" button to the card
                        let showRecipe = $("<i>more_vert</i>");
                        showRecipe.addClass("material-icons right activator");
                        titleDivSpan.append(showRecipe);
                        // Creates drink text
                        let drinkTitle = $("<h5>" + drinks[i].strDrink + "</h5>");
                    //Creates a div for the recipe to be displayed in
                    let recipeDiv= $("<div>");
                    recipeDiv.addClass("card-reveal");
                        //adds a span element to the drink div
                        let recipeDivSpan = $("<span>" + drinks[i].strDrink + "</span>");
                        recipeDivSpan.addClass("card-title grey-text text-darken-4");
                        recipeDiv.append(recipeDivSpan);
                        //adds "more vert" button to the card
                        let closeRecipe = $("<i>" + "close" + "</i>");
                        closeRecipe.addClass("material-icons right");
                        recipeDivSpan.append(closeRecipe);


                    // Find drink Id#
                    let drinkId = drinks[i].idDrink;
                    var secondQueryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId;

                    //Make ajax request for the drink
                    $.ajax({
                        url: secondQueryURL,
                        method: "GET"
                    }).then(function(response) {
                        console.log(response.drinks[0]);
                        let recipe = response.drinks[0];

                        //For populating incredient list to card:
                        //puts the ingredientsHeader on the card
                        let ingredientsHeader = $("<h6>Ingredients:</h6>");
                        recipeDiv.append(ingredientsHeader);
                        //Creates an unordered list for ingredients
                        let ingList = $("<ul>");
//This for loop needs some help...
                        // creates and populates ingredients with amounts:
                        // for (let i = 0; i < 15; i++) {
                        //     // if there is no ingredient to append, return this loop
                        //     if (recipe.strIngredient + [i] === null){
                        //         return
                        //     }
                        //     //append a new list item with measures and ingredients
                        //     let ingLi = $("<li>" + recipe.strMeasure + [i]  + ": " + recipe.strIngredient + [i]+ "</li>")
                        //     ingList.append(ingLi);
                        // }
                        //appends measures and ingredients to the page
                        recipeDiv.append(ingList);
                         //puts the recipe header on the card
                        let recipeHeader = $("<h6>Recipe:</h6>");
                        recipeDiv.append(recipeHeader);
                        let recipeText = $("<p>" + recipe.strInstructions + "</p>");
                        recipeDiv.append(recipeText);
                    });



            // Appends the div to the appropriate id on the page
            drinkTitleDiv.append(titleDivSpan);
            drinkTitleDiv.append(drinkTitle);
            imgDiv.append(drinkImg);
            imgCardDiv.append(imgDiv);
            imgCardDiv.append(drinkTitleDiv);
            imgCardDiv.append(recipeDiv);
            drinkCardDiv.append(imgCardDiv);
            $("#results").append(drinkCardDiv);
        // drinkRecipe(drinks[i].idDrink)
        }
    })
};


});

