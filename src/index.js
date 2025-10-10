/*
Overview of my solution:
1. Create an array of cities on the page by grabbing them from the DOM.
2. Feed the array of cities into a function that maps them to their timezones in the Moment JS dataset.
3. Feed the array of formatted timezones into a function to update and format the time.
4. The updateTime function uses setInterval to update the time per timezone associated with each city every second.
*/

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

const findTimezone = (cities) => {
  const allTimezones = moment.tz.names(); // get list of timezones from Moment
  console.log(allTimezones);

  let formattedTimezones = [];
  cities.forEach((city) => {
    // Use cities array to generate array of corresponding timezones named properly
    const timezone = allTimezones.filter((timezone) => {
      return timezone.includes(city);
    });
    console.log(timezone);
    formattedTimezones.push(timezone);
  });

  console.log(formattedTimezones);
  updateTime(formattedTimezones);
};

const getCities = () => {
  const cityElements = document.querySelectorAll(".city");
  let cities = [];
  cityElements.forEach((cityElement) => {
    console.log(cityElement.childNodes[0].data);
    const cityName = cityElement.childNodes[0].data;
    const capitalizedCity =
      cityName.charAt(0).toUpperCase() + cityName.slice(1); // Safeguard measure: ensure city is capitalized to facilitate search through timezones list
    // console.log(capitalizedCity);
    cities.push(capitalizedCity);
  });
  console.log(cities);
  return cities;
};

const updateDisplay = () => {
  let cities = getCities();
  findTimezone(cities);
};

updateDisplay();

// why use a select instead of a search?
