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
    headerElement.style.backgroundColor = "red";
    // Add more styling as needed
  } else {
    // Revert to the original styling
    headerElement.style.backgroundColor = "#44A2BC";
  }
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".myVidSwiper", {
  grabCursor: true,
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 30,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// let serverURL = "http://localhost/powermanserver";
let serverURL = "https://spotlightscoop.000webhostapp.com/powermanServer"

let successMsg = document.getElementById("successMsg");
let successMsgSpan = successMsg.querySelector("span");
let errMsg = document.getElementById("errMsg");
let errMsgSpan = errMsg.querySelector("span");

let contactUsForm = document.getElementById("contactUsForm")

contactUsForm.addEventListener('submit',async function(e){
  e.preventDefault()

  let formData = new FormData(contactUsForm)

  let sendData = await fetch(`${serverURL}/?q=sendContactUsMessage`,{
    method:'POST',
    body : formData
  })

  let response = await sendData.json()

  if(response.status){
    successMsg.style.display = "block";
        successMsgSpan.innerHTML = response.msg;
  } else{
    errMsg.style.display = "block";
        errMsgSpan.innerHTML = err.msg;
  }

  let dismissContactUsModal = document.getElementById("dismissContactUsModal")
  dismissContactUsModal.click()

  console.log(response)
})

function convertTo12HourFormat(timeString) {
  let [hours, minutes, seconds] = timeString.split(':');
  let period = 'AM';

  if (parseInt(hours) >= 12) {
    period = 'PM';
    if (parseInt(hours) > 12) {
      hours = parseInt(hours) - 12;
    }
  } else if (parseInt(hours) === 0) {
    hours = '12';
  }

  return `${hours}:${minutes} ${period}`;
}

// function updateCountdown(eventFromDate) {

//   const eventDate = new Date(eventFromDate).getTime();
//   const now = new Date().getTime();
//   const timeRemaining = eventDate - now;

//   if (timeRemaining > 0) {
//     const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

//   } else {
//     countdown.innerHTML = "<p class='text-danger'>Event has started</p>";
//   }
// }

let allEvents;

function getEvents() {
  fetch(`${serverURL}/?q=getEvents`)
    .then((response) => response.json())
    .then((response) => {
      let events = response.events;
      allEvents = events;
      let eventsContainer = document.getElementById("eventsContainer");
      eventsContainer.innerHTML = ""; // Clear the container

      if(events.length > 0){
        events.forEach((event) => {
          // Create the event card
          let eventCard = document.createElement("div");
          eventCard.className = "col-12 mt-3 row bg-light m-0 p-0 rounded overflow-hidden";
          eventCard.innerHTML = `
            <div class="col-md-3 p-0">
              <img src='${serverURL}/${event.event_image}' class="w-100 p-0 m-0" style="height: 100%; object-fit: cover" alt="">
            </div>
            <div class="col-md-9 text-dark py-3">
              <h3 class="fw-bold">${event.event_title}</h3>
              <p>${event.event_description}</p>
              <p class="fw-bold">
                ${convertTo12HourFormat(event.event_time)} <br />
                ${new Date(event.event_from_date).toDateString()}
              </p>
              <div id="countdown${event.event_id}" class="d-flex card-footer text-center justify-content-between border-top">
  
  </div>
            </div>
          `;

          eventsContainer.appendChild(eventCard);
  
          
            function updateCountdown(eventId,date) {
              let eventDate = new Date(date).getTime();
              let now = new Date().getTime();
              let timeRemaining = eventDate - now;
      
              let countdown = document.getElementById(`countdown${eventId}`)
            
              if (timeRemaining > 0) {
                let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
                let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

                console.log(`${days} days, ${hours} hours, ${minutes} minutes,${seconds} seconds`)
      
                countdown.innerHTML =   `<span>
                <b class="fs-3 text-danger" id="days">${days}</b> <br />
                <b>days</b>
              </span>
              <span>
                <b class="fs-3 text-danger" id="hours">${hours}</b> <br />
                <b>hours</b>
              </span>
              <span>
                <b class="fs-3 text-danger" id="minutes">${minutes}</b> <br />
                <b>minutes</b>
              </span>
              <span>
                <b class="fs-3 text-danger" id="seconds">${seconds}</b> <br />
                <b>seconds</b>
              </span>`
            
              } else {
                countdown.innerHTML = "<p class='text-danger'>Event has started</p>";
              }
            }
            setInterval(() => {
          updateCountdown(event.event_id,`${event.event_from_date} ${event.event_time}`)
        }, 1000);
  
          
        });
      } else{
        eventsContainer.innerHTML = `
        No upcoming events, Stay tuned for exciting updates.
        `
      }
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

getEvents()