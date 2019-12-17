// Buttons
$("#homeBtn").on("click", function () {
    document.location.href = "home.html";
})
$("#recipeBtn").on("click", function () {
    document.location.href = "recipe.html";
})

// Functions

// This function will grab the Food recipes saved
function foodRecipes() 
{
    var myFood = JSON.parse(localStorage.getItem("myFood"))
    console.log(myFood);

    // Loop through the local storage array and create cards for the recipes
    for (let i = 0; i < myFood.length; i++) 
    {
            // Create the divs and add the classes / attributes
            let foodCardDiv = $("<div>").addClass("col s12 m6 xl4 recipe");
            let imgCardDiv = $("<div>").addClass("card large hoverable");
            let imgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");
            let recipeImg = $("<img>").attr("src", myFood[i]["img"]).addClass("activator");
            let recipeTitleDiv = $("<div>").addClass("card-content");
            let titleDivSpan = $("<span>").addClass("card-title grey-text text-darken-4");
            let showRecipe = $("<i>more_vert</i>").addClass("s1 material-icons right activator");
            let recipeTitle = $("<h5>" + myFood[i]["label"] + "</h5>").addClass("s9");
            let recipeDiv = $("<div>").addClass("card-reveal");
            let recipeDivSpan = $("<span>" + myFood[i]["label"] + "</span>").addClass("card-title grey-text text-darken-4");
            let closeRecipe = $("<i>" + "close" + "</i>").addClass("material-icons right");
            let recipeHeader = $("<h6>Recipe:</h6>");
            let recipeText = $("<p> Find out how to cook this dish: <a href=" + myFood[i]["url"] + " target='_blank'>" + myFood[i]["url"] + "</p>");
                        
            // Append the divs to the container

            titleDivSpan.append(showRecipe);
            recipeDiv.append(recipeDivSpan);
            recipeDivSpan.append(closeRecipe);
            recipeTitleDiv.append(titleDivSpan);
            recipeTitleDiv.append(recipeTitle);
            imgDiv.append(recipeImg);
            imgCardDiv.append(imgDiv);
            imgCardDiv.append(recipeTitleDiv);
            imgCardDiv.append(recipeDiv);
            foodCardDiv.append(imgCardDiv);
            recipeDiv.append(recipeHeader);
            recipeDiv.append(recipeText);
            
            $("#myRecipes").append(foodCardDiv);        
    }
}

function drinkRecipes() 
{
    var myDrink = JSON.parse(localStorage.getItem("myDrink"))
    console.log(myDrink);

    // Loop through the local storage array and create cards for the recipes
    for (let i = 0; i < myDrink.length; i++) {

        var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + myDrink[i];
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) 
        {
            var drinkRecipe = response.drinks[0];
            let recipe = response.drinks[0];
            console.log(response);
             // Create the divs and add the classes / attributes
             let foodCardDiv = $("<div>").addClass("col s12 m6 xl4 recipe");
             let imgCardDiv = $("<div>").addClass("card large hoverable");
             let imgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");
             let recipeImg = $("<img>").attr("src", drinkRecipe.strDrinkThumb).addClass("activator");
             let recipeTitleDiv = $("<div>").addClass("card-content");
             let titleDivSpan = $("<span>").addClass("card-title grey-text text-darken-4");
             let showRecipe = $("<i>more_vert</i>").addClass("s1 material-icons right activator");
             let recipeTitle = $("<h5>" + drinkRecipe.strDrink + "</h5>").addClass("s9");
             let recipeDiv = $("<div>").addClass("card-reveal");
             let recipeDivSpan = $("<span>" + drinkRecipe.strDrink + "</span>").addClass("card-title grey-text text-darken-4");
             let closeRecipe = $("<i>" + "close" + "</i>").addClass("material-icons right");
             let ingredientsHeader = $("<h6>Ingredients:</h6>");
             let ingList = $("<ul>");
             
             let recipeHeader = $("<h6>Recipe:</h6>");
             let recipeText = $("<p>" + recipe.strInstructions + "</p>");            
 
             

            // creates and populates ingredients with amounts:
            for (let i = 1; i < 16; i++) 
            {
                // if there is no ingredient (or measure) to append, make their value= ""
                if (recipe["strIngredient" + i ] === null)
                {
                    recipe["strIngredient" + i ] = "";
                }
                if (recipe["strMeasure" + i ] === null)
                {
                    recipe["strMeasure" + i ] = "";
                }

                //append a new list item with measures and ingredients
                let ingLi = $("<li>" + recipe["strMeasure" + i ] + recipe["strIngredient" + i ]+ "</li>")
                ingList.append(ingLi);
            }


        
             
            // Append the divs to the container 
             titleDivSpan.append(showRecipe);
             recipeDiv.append(recipeDivSpan);
             recipeDiv.append(ingredientsHeader);
             recipeDivSpan.append(closeRecipe);
             recipeTitleDiv.append(titleDivSpan);
             recipeTitleDiv.append(recipeTitle);
             imgDiv.append(recipeImg);
             imgCardDiv.append(imgDiv);
             imgCardDiv.append(recipeTitleDiv);
             imgCardDiv.append(recipeDiv);
             foodCardDiv.append(imgCardDiv);
             recipeDiv.append(ingList);
             recipeDiv.append(recipeHeader);
             recipeDiv.append(recipeText);
             
             
             $("#myRecipes").append(foodCardDiv);

        })
    }
}

foodRecipes();
drinkRecipes();