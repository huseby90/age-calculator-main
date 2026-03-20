const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const button = document.getElementById("submit");

const yearDisplayEl = document.getElementById("years");
const monthDisplayEl = document.getElementById("months");
const dayDisplayEl = document.getElementById("days");

button.addEventListener("click", function () {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  const today = new Date();
  const birth = new Date(year, month - 1, day);

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();
  /* years  = 2025 - 1990 = 35
    months = 7 - 3       = 4
    days   = 5 - 28      = -23  ← impossible 
    You haven't fully completed that last month yet, so you need to "borrow" from months:

    days   = -23 + 30 = 7
    months = 4 - 1    = 0
    
    */

  if (days < 0) {
    days += 30;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  animateValue(years, yearDisplayEl);
  animateValue(months, monthDisplayEl);
  animateValue(days, dayDisplayEl);
});

function animateValue(targetValue, element) {
  let displayedValue = 0;
  const speed = 30;

  const interval = setInterval(countUp, speed);
  
  function countUp() {
    if (displayedValue < targetValue) {
      element.textContent = displayedValue;
      displayedValue++;
    } else {
      element.textContent = targetValue;
      clearInterval(interval);
    }
  }
}