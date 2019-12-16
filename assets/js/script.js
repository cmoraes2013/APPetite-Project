// JavaScript Sheet
AOS.init();

$("#searchBtn").on("click", function(event){
event.preventDefault()
document.location.href = "recipe.html";
let textValue = $("#textValue").val(); 
localStorage.setItem("searchValue", textValue)
});