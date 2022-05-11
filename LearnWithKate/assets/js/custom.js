
// mark today with a red border-top & red border-bottom to let the user know what day it is
const tagToday = (day) => {
  // list of all days in the week
  const todayRow = document.getElementsByClassName("opening-hours-row")[day === 0 ? 6 : (day - 1)];

  // mark today in the opening hours
  todayRow.classList.add("today-opening-hours");

  // show today tag
  const today = todayRow.getElementsByTagName("th")[0];
  today.innerHTML = `<span class='text-green'>TODAY</span>`;

  if(today.classList.contains('cs')) {
    today.innerHTML = `<span class='text-green'>DNES</span>`;
  }
};

tagToday(new Date().getDay());

const closeNavBar = () => {
  const navbar = document.getElementById("navbar-mobile");
  const backdrop = document.getElementsByClassName("offcanvas-backdrop")[0];

  navbar.classList.remove("show");
  backdrop.classList.remove("show");
};
