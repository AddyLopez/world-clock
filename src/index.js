// alert("World Clock");
const cityElements = document.querySelectorAll(".city");
let cities = [];
cityElements.forEach((cityElement) => {
  console.log(cityElement.childNodes[0].data);
  cities.push(cityElement.childNodes[0].data);
});
console.log(cities);

const updateTime = (timezones) => {
  const timeElements = document.querySelectorAll(".time");
  setInterval(() => {
    timeElements.forEach((timeElement, index) => {
      const time = moment()
        .tz(`${timezones[index]}`)
        .format("h:mm:ss [<span>]A[</span>]");
      timeElement.innerHTML = time;
    });
  }, 10);
};

const findTimezone = (cities) => {
  const allTimezones = moment.tz.names(); // get list of timezones from Moment
  /*const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1); // capitalize city to facilitate search through timezones list
  // console.log(capitalizeCity); */
  let formattedTimezones = [];
  cities.forEach((city) => {
    const timezone = allTimezones.filter((timezone) => {
      return timezone.includes(city);
    });
    console.log(timezone);
    formattedTimezones.push(timezone);
  });
  //console.log(allTimezones);
  console.log(formattedTimezones);
  updateTime(formattedTimezones);
};

findTimezone(cities);
