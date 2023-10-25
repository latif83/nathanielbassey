function checkLogin() {
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    const loginTime = parseInt(localStorage.getItem("loginTime"), 10);
    const currentTime = new Date().getTime();
    const elapsedMinutes = (currentTime - loginTime) / (1000 * 60);

    // Check if 10 minutes have passed
    if (elapsedMinutes >= 10) {
      // Log out the user
      localStorage.setItem("loggedIn", "false");
      localStorage.removeItem("loginTime");
      alert("Login session expired, please login again.");
      return false
    } else {
      return true
    }
  } else {
    alert("Please login to access this page.");
    return false
  }
}

function logout(){
    let confirmLogout = confirm("Are you sure you want to logout?")
    if(confirmLogout){
        localStorage.removeItem('loggedIn')
        localStorage.removeItem('loginTime')
        alert('Logout successful.')
        location.replace("?page=login")
    }
}

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

// Function to get the value of a specific GET parameter
function getQueryParam(parameterName) {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameterName);
}

let checkingLogin = checkLogin();

// Usage example
let paramValue = checkingLogin ? getQueryParam("page") : 'login';

if (paramValue) {
  $(document).ready(function () {
    $("#mainContainer").load(
      `../manage/${paramValue}.html`,
      function (response, status, xhr) {
        //    document.getElementById(paramValue).classList.add("active");
        if (status === "error") {
          // Handle the error here
          $("#mainContainer").html(
            '<h2 class="text-danger text-center mt-5">Sorry, the page was not found.</h2>'
          );
        }
      }
    );
  });
} else {
  $(document).ready(function () {
    $("#mainContainer").load(
      "../manage/dashboard.html",
      function (response, status, xhr) {
        //    document.getElementById("dashboard").classList.add("active");
        if (status === "error") {
          // Handle the error here
          $("#mainContainer").html(
            '<h2 class="text-danger text-center mt-5">Sorry, the page was not found.</h2>'
          );
        }
      }
    );
  });
}

let serverURL = "http://localhost/powermanserver";

async function getSummary(){
  let makeRequest = await fetch(`${serverURL}/?q=getSummaryCount`)
  let response = await makeRequest.json()
  console.log(response)
  $("#msg1").html(response.message_count)
  $("#msg2").html(response.message_count)
  $("#msgs_counts").html(response.message_count)
  $("#events_counts").html(response.event_count)
}

getSummary()