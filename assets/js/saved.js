//

var myRecipes = JSON.parse(localStorage.getItem("myRecipes"))

// Loop through the local storage array and create cards for the recipes

function createDiv ()
{
    for (let i = 0; i < myRecipes.length; i++)
    {
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

        titleDivSpan.append(showRecipe);
        recipeTitle.append(saveFeature);
        recipeTitle.append(saveIcon);
        recipeDiv.append(recipeDivSpan);
        recipeDivSpan.append(closeRecipe);
    }
}