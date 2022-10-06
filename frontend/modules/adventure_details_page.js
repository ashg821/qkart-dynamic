import config from "../conf/index.js";
import { addReservationToTable } from "./reservation_page.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search.slice(1));
  return params.get('adventure');

  // Place holder for functionality to work in the Stubs
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const cityList = await res.json();
    return cityList;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  const imgDiv = document.getElementById('photo-gallery');
  adventure.images.forEach(ele => {
    imgDiv.innerHTML += `<div><img src=${ele} class="activity-card-image"><div>`
  });
  document.getElementById('adventure-content').innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const imgDiv = document.getElementById('photo-gallery');
  imgDiv.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src=${images[0]} class="d-block w-100 activity-card-image" alt="Some Image">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

  const carousel = document.querySelector('.carousel-inner');
  images.forEach((ele, index) => {
    if (index > 0) {
      carousel.innerHTML += `<div class="carousel-item">
        <img src=${ele} class="d-block w-100 activity-card-image" alt="Some Image">
      </div>`
    }
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  const reservationPanel = document.getElementById('reservation-panel-available');
  const soldOutPanel = document.getElementById('reservation-panel-sold-out');
  const costPerHead = document.getElementById('reservation-person-cost');
  if (!adventure.available) {
    reservationPanel.style.display = 'none';
    soldOutPanel.style.display = 'block';
  }
  else {
    soldOutPanel.style.display = 'none';
    reservationPanel.style.display = 'block';
    costPerHead.innerHTML = adventure.costPerHead;
    // console.log(cost);
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const reservationCost = document.getElementById('reservation-cost');
  reservationCost.innerHTML = persons * adventure.costPerHead;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.querySelector('#myForm');
  // console.log(form);

  // const formData = new FormData(form);

  form.addEventListener('submit', (e) => {
    // console.log(Object.fromEntries(formData.entries()));
    e.preventDefault();
    const data = {
      name: document.querySelector('input[name="name"]').value,
      date: document.querySelector('input[name="date"]').value,
      person: document.querySelector('input[name="person"]').value,
      adventure: adventure.id
    }
    // const plainFormData = Object.fromEntries(formData.entries());
    // const formDataJsonString = JSON.stringify(plainFormData);
    // console.log(plainFormData);
    let params = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    fetch(`${config.backendEndpoint}/reservations/new`, params).then(res => res.json()).then(data => { alert('Success!') }).catch(err => { alert('Failed!') })
    // location.reload();
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) document.getElementById('reserved-banner').style.display = 'block';
  else document.getElementById('reserved-banner').style.display = 'none';

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
