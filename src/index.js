/*
Overview of my solution:
1. Create an array of cities on the page by grabbing them from the DOM.
2. Feed the array of cities into a function that maps them to their timezones in the Moment JS dataset.
3. Feed the array of formatted timezones into a function to update and format the date and time.
4. UpdateDateTime bundles logic to updateDate and updateTime.
4. The updateTime function uses setInterval to update the time per timezone associated with each city every second.
NOTE: This solution is better suited for a search bar, which is less limited than a select menu.
*/
const getCities = () => {
  const cityElements = document.querySelectorAll(".city");
  let cities = [];
  cityElements.forEach((cityElement) => {
    //console.log(cityElement.childNodes[0].data);
    const cityName = cityElement.childNodes[0].data;
    cities.push(cityName);
  });
  //console.log(cities);
  return cities;
};

const updateDate = (timezones) => {
  const dateElements = document.querySelectorAll(".date");
  dateElements.forEach((dateElement, index) => {
    const date = moment().tz(`${timezones[index]}`).format("MMMM D, YYYY");
    dateElement.innerHTML = date;
  });
};

const updateTime = (timezones) => {
  const timeElements = document.querySelectorAll(".time");
  setInterval(() => {
    timeElements.forEach((timeElement, index) => {
      const time = moment()
        .tz(`${timezones[index]}`)
        .format("h:mm:ss [<span>]A[</span>]");
      timeElement.innerHTML = time;
    });
  }, 1000);
};

const updateDateTime = (timezones) => {
  updateDate(timezones); // Establish the date right away, then trigger updates after 24 hours
  setInterval(updateDate, 86400000); // Update the date every 24 hours, which is 86400 * 1000 milliseconds
  updateTime(timezones);
};

const findTimezone = (cities) => {
  const allTimezones = moment.tz.names(); // get list of timezones from Moment
  //console.log(allTimezones);

  let formattedTimezones = [];
  cities.forEach((city) => {
    let timezone;
    if (city === "Current Location") {
      timezone = moment.tz.guess();
    } else {
      timezone = allTimezones.filter((timezone) => {
        return timezone.includes(city);
      });
    }
    // Use cities array to generate array of corresponding timezones named properly
    //console.log(timezone);
    formattedTimezones.push(timezone);
  });

  // console.log(formattedTimezones);
  updateDateTime(formattedTimezones);
};

const updateDisplay = () => {
  let cities = getCities();
  findTimezone(cities);
};

const addCity = (event) => {
  const selected = event.target.value;
  let capitalizedSelected =
    selected.charAt(0).toUpperCase() + selected.slice(1); // Safeguard measure: ensure selected city is capitalized to facilitate search through timezones list
  if (selected === "current-location") {
    capitalizedSelected = "Current Location";
    console.log(capitalizedSelected);
  }
  // console.log(capitalizedSelected);
  const clocks = document.getElementById("clocks");
  //console.log(clocks);
  const childNode = `
    <section class="clock-instance">
      <div>
        <p class="city">${capitalizedSelected}</p>
        <p class="date"></p>
      </div>
      <p class="time"></p>
    </section>`;
  if (!clockChildNodes.includes(childNode)) {
    clockChildNodes.push(childNode);
  } else {
    return;
  }
  // console.log(clockChildNodes);
  clocks.innerHTML = clockChildNodes.join(""); // debugs by removing the comma displayed between multiple clock-instances
  updateDisplay();
};

let clockChildNodes = [];
const citiesSelect = document.getElementById("cities");
citiesSelect.addEventListener("change", addCity);
//updateDisplay();

// why use a select instead of a search?
// should switch to document fragments instead, probably
