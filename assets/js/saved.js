//

var myRecipes = JSON.parse(localStorage.getItem("myRecipes"))
console.log(myRecipes);

// Loop through the local storage array and create cards for the recipes
for (let i = 0; i < myRecipes.length; i++)
{
var queryURL = "https://api.edamam.com/search?q=" + JSON.stringify(myRecipes) + "&app_id=84f17b3a&app_key=4f2ef891037c9d69f5c48f49d63d0669"

$.ajax(
    {
        url: queryURL,
        method: "GET"
    }).then(function (response) 
    {
        for (let i = 0; i < myRecipes.length; i++) 
        {
            // Create the divs and add the classes / attributes
            let foodCardDiv = $("<div>").addClass("col s12 m6 xl4 recipe");
            let imgCardDiv = $("<div>").addClass("card large hoverable");
            let imgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");
            let recipeImg = $("<img>").attr("src", myRecipes[i]).addClass("activator");
            let recipeTitleDiv = $("<div>").addClass("card-content");
            let titleDivSpan = $("<span>").addClass("card-title grey-text text-darken-4");
            let showRecipe = $("<i>more_vert</i>").addClass("s1 material-icons right activator");
            let recipeTitle = $("<h5>" + myRecipes[i] + "</h5>").addClass("s9");
            let saveFeature = $("<h6>Save to favorites</h6>").addClass("s saveBtn");
            let saveIcon = $("<span><i>save</i></span>").addClass("material-icons right s1 saveBtn").attr("data-label", myRecipes[i]);
            let recipeDiv = $("<div>").addClass("card-reveal");
            let recipeDivSpan = $("<span>" + myRecipes[i] + "</span>").addClass("card-title grey-text text-darken-4");
            let closeRecipe = $("<i>" + "close" + "</i>").addClass("material-icons right");

            // Append the divs to the container
            titleDivSpan.append(showRecipe);
            recipeTitle.append(saveIcon).append(saveFeature);
            recipeDiv.append(recipeDivSpan);
            recipeDivSpan.append(closeRecipe);
            recipeTitleDiv.append(recipeTitle).append(titleDivSpan);
            imgDiv.append(recipeImg);
            imgCardDiv.append(recipeDiv).append(recipeTitleDiv).append(imgDiv);
            foodCardDiv.append(imgCardDiv);
            $("#myRecipes").append(foodCardDiv);

        }
    });

$("#homeBtn").on("click", function () {
    document.location.href = "home.html";
})
$("#recipeBtn").on("click", function () {
    document.location.href = "recipe.html";
})
}