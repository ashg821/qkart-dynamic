import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // debugger;
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const res = await fetch(config.backendEndpoint + '/cities');
    return await res.json();
  } catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataEle = document.getElementById('data');
  // dataEle.innerHTML = "";
  const cardEle = document.createElement('div');
  cardEle.setAttribute("class", "col-sm-6 col-lg-3 my-2");
  // cardEle.setAttribute("id", id);
  cardEle.innerHTML = `<a href="pages/adventures/?city=${id}" id="${id}">
          <div class="tile">
            <img src="${image}" />
            <div class="tile-text text-center">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
          </div>
        </a>`;
  dataEle.appendChild(cardEle);

}

const searchEle = document.querySelector('.hero-input');
searchEle.addEventListener('change', async () => {
    let cities = await fetchCities();
    const filteredCities = cities.filter(ele => ele.id.indexOf(searchEle.value) != -1);
    console.log(searchEle.value, filteredCities);
    if (filteredCities.length) {
      const dataEle = document.getElementById('data');
      dataEle.innerHTML = '';
      filteredCities.forEach((key) => {
        addCityToDOM(key.id, key.city, key.description, key.image);
      });
    }
    else {
      const dataEle = document.getElementById('data');
      dataEle.innerHTML = '';
        init();
    }
});


export { init, fetchCities, addCityToDOM };
