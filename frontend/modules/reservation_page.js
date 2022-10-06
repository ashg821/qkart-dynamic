import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations`);
    const data = await res.json();
    return data
  } catch (err) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  const tableBody = document.getElementById('reservation-table');
  const href = location.href;
  const actionHref =  href.slice(0, href.indexOf('reservations'));
  reservations.forEach(ele => {
    tableBody.innerHTML += `
    <tr>
      <td>${ele.id}</td>
      <td>${ele.name}</td>
      <td>${ele.adventureName}</td>
      <td>${ele.person}</td>  
      <td>${new Date(ele.date).toLocaleDateString("en-IN")}</td>
      <td>${ele.price}</td>
      <td>${new Date(ele.time).toLocaleString("en-IN", {dateStyle: "long", timeStyle: "medium"}).replace(' at', ',')}</td>
      <td id=${ele.id}><a href="${actionHref}detail/?adventure=${ele.adventure}" class="reservation-visit-button">Visit Adventure</a></td>
    </tr>
    `
  });
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length != 0) {
    document.getElementById('reservation-table-parent').style.display = 'block';
    document.getElementById('no-reservation-banner').style.display = 'none';
  }
  else {
    document.getElementById('reservation-table-parent').style.display = 'none';
    document.getElementById('no-reservation-banner').style.display = 'block';
    
  }


  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
