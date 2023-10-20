let menuBTN = document.getElementById("menuBTN");
let responsiveMenu = document.getElementById("responsiveMenu");

menuBTN.addEventListener("click", function () {
  if (
    responsiveMenu.style.display == "none" ||
    responsiveMenu.style.display == ""
  ) {
    responsiveMenu.style.display = "flex";
    menuBTN.style.position = "relative";
    menuBTN.children[0].style.display = "none";
    menuBTN.children[1].style.position = "absolute";
    menuBTN.children[1].style.transform = "rotate(130deg)";
    menuBTN.children[1].style.top = "0";
    menuBTN.children[1].style.left = "0";
    menuBTN.children[1].style.backgroundColor = "red";
    menuBTN.children[2].style.position = "absolute";
    menuBTN.children[2].style.transform = "rotate(45deg)";
    menuBTN.children[2].style.top = "0";
    menuBTN.children[2].style.right = "0";
    menuBTN.children[2].style.backgroundColor = "red";
  } else {
    responsiveMenu.style.display = "none";
    menuBTN.style.position = "relative";
    menuBTN.children[0].style.display = "block";
    menuBTN.children[1].style.position = "relative";
    menuBTN.children[1].style.transform = "rotate(0deg)";
    menuBTN.children[2].style.position = "relative";
    menuBTN.children[2].style.transform = "rotate(0deg)";
    menuBTN.children[2].style.backgroundColor = "white";
    menuBTN.children[1].style.backgroundColor = "white";
  }
});

// Get a reference to the element you want to style
var headerElement = document.querySelector("header");

// Add a scroll event listener to the window
window.addEventListener("scroll", function () {
  // Check the current scroll position
  var scrollPosition = window.scrollY || window.pageYOffset;

  // Define the threshold (in pixels) when you want to apply the styling
  var scrollThreshold = 500;

  // Check if the scroll position is greater than the threshold
  if (scrollPosition > scrollThreshold) {
    // Apply your desired styling
    headerElement.style.backgroundColor = "rgb(38, 0, 255)";
    // Add more styling as needed
  } else {
    // Revert to the original styling
    headerElement.style.backgroundColor = "rgba(38, 0, 255, 0.375)";
  }
});
