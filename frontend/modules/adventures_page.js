import config from "../conf/index.js";

//executed when remove button is clicked on the catefory filter to remove a specific filter
function removeCategory(filters, adventures) {
  console.log(filters, adventures, "remove category");
  const removeIcon = document.getElementsByClassName('close');
  Array.from(removeIcon).forEach((ele, index) => {
    ele.addEventListener('click', async (e) => {
      e.target.parentElement.remove();
      filters.category.splice(index, 1);
      //Applies filters on the adventures list
      let filteredAdventures = filterFunction(adventures, filters);
      saveFiltersToLocalStorage(filters);
      document.getElementById("data").textContent = "";
      // Updates the filtered adventures list to the DOM
      addAdventureToDOM(filteredAdventures)
    });
  });
}
// window.removeCategory = removeCategory;
//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // return search.slice(search.indexOf('=') + 1);

  let params = new URLSearchParams(search.slice(1));
  return params.get('city');

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const cityList = await res.json();
    return cityList;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataEle = document.getElementById('data');
  for (let card of adventures) {
    dataEle.innerHTML += `
                    <div class="col-6 col-lg-3 my-2">
                      <a href="detail/?adventure=${card.id}" id=${card.id}>
                        <div class="banner-parent">
                          <div class="category-banner">${card.category}</div>
                          <div class="activity-card">
                              <img src=${card.image}>
                              <div class="d-flex justify-content-between mt-2">
                              <p style="padding: 0 20px;margin-bottom: 0; font-weight: 500;">${card.name}</h5>
                              <p style="padding-right: 20px;">₹${card.costPerHead}</p>
                              </div>
                              <div class="d-flex justify-content-between mb-2">
                              <p style="padding: 0 20px;margin-bottom: 0; font-weight: 500;">Duration</h5>
                              <p style="padding-right: 20px;margin-bottom: 0;">${card.duration} Hours</p>
                              </div>
                          </div>
                        </div>
                      </a>
                    </div>
    `
  }
  const btn = document.getElementById('addBtn');
  const data = JSON.stringify({ city: getCityFromURL(window.location.search) });
  btn.addEventListener('click', () => {
    let params = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: data
    }
    fetch(`${config.backendEndpoint}/adventures/new`, params);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  // console.log(low, high);
  const filteredList = list.filter(ele => ele.duration > low && ele.duration <= high);
  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  for (let category of categoryList) {
    // list.map(ele => {
    //   if (category == ele.category) return filteredList.push(ele);
    // });
    // console.log(list.filter(ele=>category == ele.category));
    filteredList = filteredList.concat(list.filter(ele => category == ele.category));

  }
  // console.log(filteredList);
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters);
  const index = filters.duration.indexOf('-');
  if (filters.duration != '' && filters.category.length == 0) return filterByDuration(list, filters.duration.slice(0, index), filters.duration.slice(index + 1));
  else if (filters.duration == '' && filters.category.length != 0) return filterByCategory(list, filters.category);
  else if (filters.duration != '' && filters.category.length != 0) {
    let filteredList = filterByDuration(list, filters.duration.slice(0, index), filters.duration.slice(index + 1));
    return filterByCategory(filteredList, filters.category)
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let filters = JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return filters;
}


//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const categoryEle = document.getElementById('category-list');
  const durationEle = document.querySelectorAll('#duration-select>*');
  filters.category.forEach((category, index) => {
    categoryEle.innerHTML += `<div class="category-filter">${category}<span class="close">X</span></div>`;
  });
  durationEle.forEach((ele, index) => {
    if (ele.value == filters.duration) document.getElementById("duration-select").selectedIndex = index;
  });
  // 
  // console.log(filters.category);
  // for (let [index, category] of filters.category) {
  //   // console.log(category);
  // }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  removeCategory
};
