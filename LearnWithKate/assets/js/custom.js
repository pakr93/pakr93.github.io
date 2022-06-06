const navbar = document.getElementById('navbar');

const home = document.getElementById('home');
const aboutMe = document.getElementById('about-me');
const howItWorks = document.getElementById('how-it-works');
const testimonials = document.getElementById('testimonials');
const pricing = document.getElementById('pricing');
const faq = document.getElementById('faq');

const flagInANutshell = document.getElementById('language-flag-nutshell');

const navItems = document.getElementsByClassName('nav-item');

// mark today with a red border-top & red border-bottom to let the user know what day it is
const tagTodayInOpeningHours = (day) => {
  // list of all days in the week
  const todayRow = document.getElementsByClassName("opening-hours-row")[day === 0 ? 6 : (day - 1)];

  // mark today in the opening hours
  todayRow.classList.add("today-opening-hours");

  // show today tag
  const today = todayRow.getElementsByTagName("th")[0];
  today.innerHTML = `<span class='text-black'>TODAY</span>`;

  if (today.classList.contains('cs')) {
    today.innerHTML = `<span class='text-black'>DNES</span>`;
  }
};

tagTodayInOpeningHours(new Date().getDay());

const closeNavBar = () => {
  const navbarMobile = document.getElementById("navbar-mobile");
  const backdrop = document.getElementsByClassName("offcanvas-backdrop")[0];

  navbarMobile.classList.remove("show");
  backdrop.classList.remove("show");
};

const changeOpacity = (element, newOpacity) => {
  element.style.opacity = newOpacity.toString();
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

window.addEventListener('scroll', () => {
  if(window.scrollY > 200 && window.innerWidth >= 991.98) {
    changeOpacity(navbar, 0.8);
  } else {
    changeOpacity(navbar, 1.0);
  }

  if(window.innerWidth < 991.98 && window.scrollY > 200) {
    changeOpacity(navbar, 0);
  }
});

const animateFlags = () => {
  const flagNames = ['Czech', 'French', 'US'];
  setInterval(() => {
    const currentFlag = flagNames[Math.floor(Math.random() * 10 % 3)]; // make it random
    flagInANutshell.src = `assets/img/icons/lineal/${currentFlag}-Flag-icon.png`;
  }, 2 * 1000);
};

animateFlags();
