// Recipes Page

$(document).ready(function () {
    AOS.init();

    $("#searchInput").keypress(function(e){
         if(e.which == 13) {
            let textValue = $("#searchInput").val().trim(); 
            localStorage.setItem("searchValue", textValue);
            callFood()
        }
    });

    // We immediately call food, when we come to this page
    callFood()

    // Populate results from our food recipe function when this button is clicked
    $("#foodBtn").on("click", function () {
        callFood()
    });

    // Populate results from our drink recipe function when this button is clicked
    $("#drinkBtn").on("click", function () {
        callDrink()
    });

    $("#savedRecipeBtn").on("click", function () {
        document.location.href = "saved.html";
    });

    function callFood() {

        var textValueStorage = localStorage.getItem("searchValue")
        // console.log(textValueStorage);


        var queryURL = "https://api.edamam.com/search?q=" + textValueStorage + "&app_id=84f17b3a&app_key=4f2ef891037c9d69f5c48f49d63d0669"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var food = response.hits

            //empties out dynamically created elements from previous search
            $("#results").empty();

            //if there aren't any matches, display:
            if (response == "") {
                //Creates a div around the card
                let responseNone = $("<div>");
                //adds classes to the initial div
                responseNone.addClass("recipeError col card-panel grey lighten-5 z-depth-1 hoverable")
                // creates another div with row/wrapper classes
                let wrapper = $("<div>");
                wrapper.addClass("col center-align vailgn-wrapper");
                //creates a div that holds an image
                let imageCol = $("<div>");
                imageCol.addClass("col s2");
                let circleImg = $("<i>");
                circleImg.addClass("fas fa-hippo");
                circleImg.attr("id", "recipeErrori");
                //creates a div to hold the error text
                let errorTextDiv = $("<div>");
                errorTextDiv.addClass("col s10");
                let errorTextSpan = $("<span><h6>Oh no! A very hungry hippo must have eaten all the recipes! <br> (Or your search didn't yield any results). <br> Definitely one of those happened. <br>Try searching again!</span><h6>")

                imageCol.append(circleImg);
                wrapper.append(imageCol);
                errorTextDiv.append(errorTextSpan);
                wrapper.append(errorTextDiv);
                responseNone.append(wrapper);
                $("#results").append(responseNone);
            }
            else {
                // for loop over the array to populate data
                for (let i = 0; i < food.length; i++) {
                    let foodCardDiv = $("<div>");
                    foodCardDiv.addClass("col s12 m6 xl4 recipe");
                    foodCardDiv.attr("data-aos", "flip-left")
                    // creates the card div
                    let imgCardDiv = $("<div>");
                    imgCardDiv.addClass("card large hoverable");
                    // creates an image div
                    let imgDiv = $("<div>");
                    imgDiv.addClass("card-image waves-effect waves-block waves-light");
                    //creates an html img tag
                    let recipeImg = $("<img>");
                    // Creates a src url for the img element
                    recipeImg.attr("src", food[i].recipe.image);
                    //adds a class to the drink image
                    recipeImg.addClass("activator")

                    // creates a text div (where our title goes)
                    let recipeTitleDiv = $("<div>");
                    recipeTitleDiv.addClass("card-content");

                    //adds a span element to the drink div
                    let titleDivSpan = $("<span>");
                    titleDivSpan.addClass("card-title grey-text text-darken-4");
                    //adds "more vert" button to the card
                    let showRecipe = $("<i>more_vert</i>");
                    showRecipe.addClass("s1 material-icons icon right activator");
                    titleDivSpan.append(showRecipe);
                    // Creates drink text
                    let recipeTitle = $("<h5>" + food[i].recipe.label + "</h5>");
                    recipeTitle.addClass("s9");
                    // add save feature
                    let saveFeature = $("<h6>Save to favorites</h6>")
                    saveFeature.addClass("s")
                    let saveIcon = $("<i>");
                    saveIcon.addClass("far fa-save saveRecipe icon material-icons right s1 saveFood");
                    saveIcon.attr({"data-label": food[i].recipe.label, "data-img": food[i].recipe.image, "data-link": food[i].recipe.uri});
    // If previously saved, title will be in local storage.Check, and populate save Icon based on answer.
                    // console.log(food[i].recipe.label)
                    checkForFavoriteFood(food[i].recipe.label, saveIcon)

                    
                    saveIcon.attr("data-label", food[i].recipe.label);
                    recipeTitle.append(saveFeature);
                    recipeTitle.append(saveIcon);

                    //Creates a div for the recipe to be displayed in
                    let recipeDiv = $("<div>");
                    recipeDiv.addClass("card-reveal");
                    //adds a span element to the drink div
                    let recipeDivSpan = $("<span>" + food[i].recipe.label + "</span>");
                    recipeDivSpan.addClass("card-title grey-text text-darken-4");
                    recipeDiv.append(recipeDivSpan);
                    //adds "more vert" button to the card
                    let closeRecipe = $("<i>" + "close" + "</i>");
                    closeRecipe.addClass("material-icons right");
                    recipeDivSpan.append(closeRecipe);

                    //For populating incredient list to card:
                    //puts the ingredientsHeader on the card
                    let ingredientsHeader = $("<h6>Ingredients:</h6>");
                    recipeDiv.append(ingredientsHeader);
                    //Creates an unordered list for ingredients
                    let ingList = $("<ul>");

                    let ingredients = food[i].recipe.ingredientLines
                    // creates and populates ingredients with amounts:
                    for (let i = 0; i < ingredients.length; i++) {
                          // if there is no ingredient (or measure) to append, make their value= ""
                            if (ingredients[i]=== null){
                               ingredients[i] = "";
                            }
                        //append a new list item with measures and ingredients
                        let ingLi = $("<li> " + ingredients[i] + "</li>")
                        ingList.append(ingLi);
                    }
                    //appends measures and ingredients to the page
                    recipeDiv.append(ingList);
                    //puts the recipe header on the card
                    let recipeHeader = $("<h6>Recipe:</h6>");
                    recipeDiv.append(recipeHeader);
                    let recipeText = $("<p> Find out how to cook this dish: <a href=" + food[i].recipe.url + " target='_blank'>" + food[i].recipe.url + "</p>");
                    recipeDiv.append(recipeText);

                    // Appends the div to the appropriate id on the page
                    recipeTitleDiv.append(titleDivSpan);
                    recipeTitleDiv.append(recipeTitle);
                    imgDiv.append(recipeImg);
                    imgCardDiv.append(imgDiv);
                    imgCardDiv.append(recipeTitleDiv);
                    imgCardDiv.append(recipeDiv);
                    foodCardDiv.append(imgCardDiv);
                    $("#results").append(foodCardDiv);

                }
            }
        });
    }


        function callDrink() {

            var textValueStorage = localStorage.getItem("searchValue")
            // console.log(textValueStorage);

            var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + textValueStorage;


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                var drinks = response.drinks
                // console.log(response)
                //empties out dynamically created elements from previous search
                $("#results").empty();

                //if there aren't any matches, display:
                if (response == "") {
                    //Creates a div around the card
                    let responseNone = $("<div>");
                    //adds classes to the initial div
                    responseNone.addClass("col card-panel grey lighten-5 z-depth-1 center-align hoverable")
                    // creates another div with row/wrapper classes
                    let wrapper = $("<div>");
                    wrapper.addClass("row vailgn-wrapper recipeError");
                    //creates a div that holds an image

                    let imageCol = $("<div>");
                    imageCol.addClass("col s2");
                    let circleImg = $("<i>");
                    circleImg.addClass("fas fa-hippo");
                    circleImg.attr("id", "recipeErrori");

                    //creates a div to hold the error text
                    let errorTextDiv = $("<div>");
                    errorTextDiv.addClass("col s10");
                    let errorTextSpan = $("<span><h6>Oh no! A very hungry hippo must have eaten all the recipes! <br> (Or your search didn't yield any results). <br> Definitely one of those happened. Try searching again!</span><h6>")

                    imageCol.append(circleImg);
                    wrapper.append(imageCol);
                    errorTextDiv.append(errorTextSpan);
                    wrapper.append(errorTextDiv);
                    responseNone.append(wrapper);
                    $("#results").append(responseNone);
                } else {
                    // for loop over the array to populate data
                    for (let i = 0; i < drinks.length; i++) {
                        // console.log(i);       
                        let drinkCardDiv = $("<div>");
                        drinkCardDiv.addClass("col s12 m6 xl4 recipe");
                        drinkCardDiv.attr("data-aos", "flip-left")
                        // creates the card div
                        let imgCardDiv = $("<div>");
                        imgCardDiv.addClass("card large hoverable");
                        // creates an image div
                        let imgDiv = $("<div>");
                        imgDiv.addClass("card-image waves-effect waves-block waves-light");
                        //creates an html img tag
                        let drinkImg = $("<img>");
                        // Creates a src url for the img element
                        drinkImg.attr("src", drinks[i].strDrinkThumb);
                        //adds a class to the drink image
                        drinkImg.addClass("activator")
                        // creates a text div (where our title goes)
                        let drinkTitleDiv = $("<div>");
                        drinkTitleDiv.addClass("card-content");

                        //adds a span element to the drink div
                        let titleDivSpan = $("<span>");
                        titleDivSpan.addClass("card-title grey-text text-darken-4");
                        //adds "more vert" button to the card
                        let showRecipe = $("<i>more_vert</i>");
                        showRecipe.addClass("material-icons icon right activator");
                        titleDivSpan.append(showRecipe);
                        // Creates drink text
                        let drinkTitle = $("<h5>" + drinks[i].strDrink + "</h5>");

                        // add save feature
                        let saveFeature = $("<h6>").text("Save to favorites")
                        saveFeature.addClass("s9")
                        let saveIcon = $("<i>");
                        saveIcon.addClass("far fa-save saveRecipe material-icons icon right s1 saveDrink");
                        saveIcon.attr("data-id", drinks[i].idDrink);

                        // If previously saved, title will be in local storage.Check, and populate save Icon based on answer.
                        checkForFavoriteDrink(drinks[i].idDrink, saveIcon)
                        drinkTitle.append(saveFeature);
                        saveFeature.append(saveIcon);
                        //Creates a div for the recipe to be displayed in
                        let recipeDiv = $("<div>");
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

                        }).then(function (response) {

                            let recipe = response.drinks[0];

                            //For populating incredient list to card:
                            //puts the ingredientsHeader on the card
                            let ingredientsHeader = $("<h6>Ingredients:</h6>");
                            recipeDiv.append(ingredientsHeader);
                            //Creates an unordered list for ingredients
                            let ingList = $("<ul>");

                            // creates and populates ingredients with amounts:
                            for (let i = 1; i < 16; i++) {
                                // if there is no ingredient (or measure) to append, make their value= ""
                                if (recipe["strIngredient" + i] === null) {
                                    recipe["strIngredient" + i] = "";
                                }
                                if (recipe["strMeasure" + i] === null) {
                                    recipe["strMeasure" + i] = "";
                                }
                                //append a new list item with measures and ingredients
                                // console.log(recipe["strMeasure"+i])

                                let ingLi = $("<li>" + recipe["strMeasure" + i] + recipe["strIngredient" + i] + "</li>")
                                ingList.append(ingLi);
                            }
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
                    };
                }
            })
        }//end of call Drink
   

    // removes save button and adds heart on click
    $(".saveRecipe").find("i").toggleClass("fa-save fa-heart");
    // Run the save function when the dynamic save button is clicked

    //function to check if a recipe was previously saved
    function checkForFavoriteFood(title, span) {
        var myRecipes = JSON.parse(localStorage.getItem("myFood"));

        if (myRecipes === null) {
            myRecipes = [];
        }
        for (let j = 0; j < myRecipes.length; j++) {
            
            if (myRecipes[j].label === title) {
                span.addClass("fa-heart");
                span.removeClass("fa-save");
            }
        };
    }

    // function to make favorite drink work/ check to see if it was previously saved
    function checkForFavoriteDrink(title, span) {
        var myDrinkRecipes = JSON.parse(localStorage.getItem("myDrink"));

        if (myDrinkRecipes === null) {
            myDrinkRecipes = [];
        }
        for (let j = 0; j < myDrinkRecipes.length; j++) {
            if (myDrinkRecipes[j] === title) {
                span.addClass("fa-heart");
                span.removeClass("fa-save");
            }
        };
    }


    $(document).on("click", ".saveFood", saveFood);
    $(document).on("click", ".saveDrink", saveDrink);
   

    // This function will save the current recipe to the favorites page
    function saveFood() {
        $(this).toggleClass('fa-save fa-heart');
        // Get the name of the recipe from the label
        var label = $(this).data("label");
        // Get the image of the recipe from
        var img = $(this).data("img");
        // Get the url for the recipe
        var url = $(this).data("link")
        // Create an array to store each favorited recipe

        var myRecipesArray = JSON.parse(localStorage.getItem("myFood"));    
        
        // If there is no recipes, then the array will appear null and need to be assigned to an array
        if (myRecipesArray === null) {
            myRecipesArray = [];
        }

        // Push the label into the array
        myRecipesArray.push({label, img, url});

       
        // If this save button is clicked save the recipe to myRecipes and save the id with it
        localStorage.setItem("myFood", JSON.stringify(myRecipesArray));
    }

    // Click the Saved recipe button to send you to the saved recipe page
    $("#recipeBtn").on("click", function()
    {
        document.location.href= "saved.html";
    })

    function saveDrink()
    {
        $(this).toggleClass('fa-save fa-heart');
        // Get the drink id
        var idDrink = $(this).data("id");
        // Store the drink recipe in the array
        var myDrinksArray = JSON.parse(localStorage.getItem("myDrink"));

        // If there is no recipes, then the array will appear null and need to be assigned to an array
        if(myDrinksArray === null)
        {
            myDrinksArray = [];
        }

        // Push drink id into array
        myDrinksArray.push(idDrink);

        // If this save button is clicked, save the recipe to myDrink 
        localStorage.setItem("myDrink", JSON.stringify(myDrinksArray));
    }
});
