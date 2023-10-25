function previewImage(input) {
  var imagePreview = document.getElementById("imagePreview");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    imagePreview.src = "";
    imagePreview.style.display = "none";
  }
}

let loading = document.getElementById("loading");
let successMsg = document.getElementById("successMsg");
let successMsgSpan = successMsg.querySelector("span");
let errMsg = document.getElementById("errMsg");
let errMsgSpan = errMsg.querySelector("span");

let addEventForm = document.getElementById("addEventForm");
addEventForm.addEventListener("submit", function (e) {
  e.preventDefault();

  loading.style.display = "flex";

  let formData = new FormData(addEventForm);

  $.ajax({
    type: "POST", // Use POST or GET, depending on your server-side code
    url: `${serverURL}/?q=createEvent`, // Replace with the actual server endpoint
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      $("#dismissEventModal").click();
      // Handle the success response from the server
      response = JSON.parse(response);
      loading.style.display = "none";
      successMsg.style.display = "block";
      successMsgSpan.innerHTML = response.msg;
      getEvents();
    },
    error: function (error) {
      $("#dismissEventModal").click();
      loading.style.display = "none";
      // Handle any errors
      let err = JSON.parse(error.responseText);
      // console.error("error",err.msg);
      errMsg.style.display = "block";
      errMsgSpan.innerHTML = err.msg;
    },
  });
});

let allEvents = [];

function getEvents() {
  $.ajax({
    type: "GET",
    url: `${serverURL}/?q=getEvents`,
    success: function (response) {
      // Handle the success response from the server
      // console.log(response)
      response = JSON.parse(response);
      let events = response.events;
      allEvents = events;
      let eventsTable = document.querySelector("table#events");
      let eventsTableTbody = eventsTable.querySelector("tbody");
      eventsTableTbody.innerHTML = "";
      if(events.length > 0){
        events.forEach((event) => {
          // Create a new table row (tr)
          let newRow = document.createElement("tr");
          newRow.innerHTML = `
                      <td><img src='${serverURL}/${event.event_image}' class="img-thumbnail" width="80" /></td>
                      <td>${event.event_title}</td>
                      <td>${event.event_description}</td>
                      <td>${event.event_time}</td>
                      <td>${event.event_from_date}</td>
                      <td>${event.event_to_date}</td>
                      <td>
                        <button onClick="deleteEvent(${event.event_id})" class="btn d-block btn-danger">
                          <i class="fa-solid fa-trash"></i>
                        </button>
                        <button onClick="editEvent(${event.event_id})" data-bs-toggle="modal"
                        data-bs-target="#editEventModal" class="btn d-block btn-info mt-2">
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                      </td>
                  `;
          eventsTableTbody.appendChild(newRow);
        });
      } else{
        eventsTableTbody.innerHTML = "<tr> <td colspan='7'> No events created, start by clicking on the plus button. </td> </tr>";
      }
    },
    error: function (error) {
      // Handle any errors
      let err = JSON.parse(error.responseText);
      console.error("error", err.msg);
    },
  });
}

getEvents();

function previewEditEventImage(input) {
  var imagePreview = document.getElementById("editImagePreview");

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      imagePreview.src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  } else {
    imagePreview.src = "";
    imagePreview.style.display = "none";
  }
}

let selectedEventId;

function editEvent(eventId) {
  let eventSelected = allEvents.find((event) => event.event_id == eventId);
  selectedEventId = eventSelected.event_id;

  // Access Inputs using id and change value in form @ editEventModal
  $("#editTitle").val(eventSelected.event_title);
  $("#editDescription").val(eventSelected.event_description);
  $("#editStartDate").val(eventSelected.event_from_date);
  $("#editEndDate").val(eventSelected.event_to_date);
  $("#editTime").val(eventSelected.event_time);
  $("#editImagePreview").attr(
    "src",
    serverURL + "/" + eventSelected.event_image
  );
}

let editEventForm = document.getElementById("editEventForm");
editEventForm.addEventListener("submit", function (e) {
  e.preventDefault();

  loading.style.display = "flex";

  let formData = new FormData(editEventForm);

  $.ajax({
    type: "POST", // Use POST or GET, depending on your server-side code
    url: `${serverURL}/?q=editEvent&eventId=${selectedEventId}`, // Replace with the actual server endpoint
    data: formData,
    contentType: false,
    processData: false,
    success: function (response) {
      $("#dismissEditEventModal").click();
      // Handle the success response from the server
      response = JSON.parse(response);
      loading.style.display = "none";
      successMsg.style.display = "block";
      successMsgSpan.innerHTML = response.msg;
      getEvents();
    },
    error: function (error) {
      $("#dismissEventModal").click();
      loading.style.display = "none";
      // Handle any errors
      let err = JSON.parse(error.responseText);
      // console.error("error",err.msg);
      errMsg.style.display = "block";
      errMsgSpan.innerHTML = err.msg;
    },
  });
});

function deleteEvent(eventId) {
  let confirmDelete = confirm(
    "Are you sure you want to continue to delete this event, this cannot be undone."
  );
  if (confirmDelete) {
    loading.style.display = "flex";
    $.ajax({
      type: "GET",
      url: `${serverURL}/?q=deleteEvent&eventId=${eventId}`,
      success: function (response) {
        // Handle the success response from the server
        response = JSON.parse(response);
        loading.style.display = "none";
        successMsg.style.display = "block";
        successMsgSpan.innerHTML = response.msg;
        getEvents();
      },
      error: function (error) {
        loading.style.display = "none";
        // Handle any errors
        let err = JSON.parse(error.responseText);
        // console.error("error",err.msg);
        errMsg.style.display = "block";
        errMsgSpan.innerHTML = err.msg;
      },
    });
  }
}
