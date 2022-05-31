const navbarMobile = document.getElementById("navbar-mobile");
const backdrop = document.getElementsByClassName("offcanvas-backdrop")[0];
const navbar = document.getElementById('navbar');

const home = document.getElementById('home');
const aboutMe = document.getElementById('about-me');
const howItWorks = document.getElementById('how-it-works');
const testimonials = document.getElementById('testimonials');
const pricing = document.getElementById('pricing');
const faq = document.getElementById('faq');

const navItems = document.getElementsByClassName('nav-item');

// mark today with a red border-top & red border-bottom to let the user know what day it is
const tagToday = (day) => {
  // list of all days in the week
  const todayRow = document.getElementsByClassName("opening-hours-row")[day === 0 ? 6 : (day - 1)];

  // mark today in the opening hours
  todayRow.classList.add("today-opening-hours");

  // show today tag
  const today = todayRow.getElementsByTagName("th")[0];
  today.innerHTML = `<span class='text-green'>TODAY</span>`;

  if (today.classList.contains('cs')) {
    today.innerHTML = `<span class='text-green'>DNES</span>`;
  }
};

tagToday(new Date().getDay());

const closeNavBar = () => {
  navbarMobile.classList.remove("show");
  backdrop.classList.remove("show");
};

const changeOpacity = (element, newOpacity) => {
  element.style.opacity = newOpacity;
};

// when the user scrolls, this function finds the position/section on the webpage and highlights given section in the navbar menu.
const showPositionInNavbar = (element, navItemIndex) => {
  const {
    top,
    bottom
  } = element.getBoundingClientRect();

  if (top <= 250 && bottom >= 250) {
    navItems[navItemIndex].classList.add('border-bottom-green');
  } else {
    navItems[navItemIndex].classList.remove('border-bottom-green');
  }
};

window.addEventListener('scroll', () => {
  showPositionInNavbar(home, 0);
  showPositionInNavbar(aboutMe, 1);
  showPositionInNavbar(howItWorks, 2);
  showPositionInNavbar(testimonials, 3);
  showPositionInNavbar(pricing, 4);
  showPositionInNavbar(faq, 5);
});
