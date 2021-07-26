const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const toggle = document.querySelector(".toggle");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

toggle.addEventListener("click", (e) => {
  const html = document.querySelector("html");
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");
    e.target.innerHTML = "Dark Mode";
  } else {
    html.classList.add("dark");
    e.target.innerHTML = "Light Mode";
  }
});

function setTime() {
  const thisTime = new Date();
  const thisDate = thisTime.getDate();
  const thisMonth = thisTime.getMonth();
  const thisDay = thisTime.getDay();
  const thisHour = thisTime.getHours();
  const thisMinute = thisTime.getMinutes();
  const thisSecond = thisTime.getSeconds();
  const ampm = thisHour >= 12 ? "PM" : "AM";

  const hoursForClock = thisHour > 12 ? thisHour % 12 : thisHour;

  hour.style.transform = `translate(-50%, -100%) rotate(${scale(
    hoursForClock,
    0,
    11,
    0,
    360
  )}deg)`;

  minute.style.transform = `translate(-50%, -100%) rotate(${scale(
    thisMinute,
    0,
    59,
    0,
    360
  )}deg)`;

  second.style.transform = `translate(-50%, -100%) rotate(${scale(
    thisSecond,
    0,
    59,
    0,
    360
  )}deg)`;

  time.innerHTML = `${hoursForClock}:${
    thisMinute < 10 ? `0${thisMinute}` : thisMinute
  } ${ampm}`;

  date.innerHTML = `${days[thisDay]}, ${months[thisMonth]} <span class="circle">${thisDate}</span>`;
}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

setTime();

setInterval(setTime, 1000);
