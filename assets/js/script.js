// JavaScript Sheet
AOS.init();

$("#searchBtn").on("click", function(){
document.location.href = "recipe.html";
let textValue = $("#textValue").val(); 
localStorage.setItem("searchValue", textValue)
});