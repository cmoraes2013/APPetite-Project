// JavaScript Sheet
AOS.init();

$("#searchBtn").on("click", function(event){
event.preventDefault()
document.location.href = "recipe.html";
let textValue = $("#textValue").val(); 
localStorage.setItem("searchValue", textValue)
});

$("#Modal1").keypress(function(e){
    if(e.which == 13) {
       let textValue = $("#textValue").val().trim(); 
       localStorage.setItem("searchValue", textValue);
       document.location.href = "recipe.html";
   }
});