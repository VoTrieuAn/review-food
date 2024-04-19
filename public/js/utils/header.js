var myButton = document.getElementById("search");
var myDiv = document.getElementById("mySearch");

myButton.addEventListener("click", function() {
  myDiv.style.display = "block";
});

myButton.addEventListener("blur", function() {
  myDiv.style.display = "none";
});