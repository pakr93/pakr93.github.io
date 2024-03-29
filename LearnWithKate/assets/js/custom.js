const navbar = document.getElementById('navbar');
const navbarNavLinks = document.querySelectorAll('.navbar-nav > .nav-item > .nav-link');
// const linkHooks = document.getElementsByClassName('link-hook');

const home = document.getElementById('home');
const aboutMe = document.getElementById('about-me');
const howItWorks = document.getElementById('how-it-works');
const testimonials = document.getElementById('testimonials');
const pricing = document.getElementById('pricing');
const faq = document.getElementById('faq');
const loadingBar = document.getElementById('loading-bar');

const flagInANutshell = document.getElementById('language-flag-nutshell');
const bookALesson = document.getElementById('book-a-lesson');

const navItems = document.getElementsByClassName('nav-item');

// represent the faq items - accordion1 is the left side, accordion2 is the right side
const accordion1 = document.getElementById('accordion-1');
const accordion2 = document.getElementById('accordion-2');

const formLevel = document.getElementById('form_level');
const swipeCards = document.getElementsByClassName('swiper-slide');

/*
  A changer class that helps change certain behavior of the website
*/
class Changer {
  constructor() {}

  /* Changes background color*/
  changeBGColor(element, oldColorClass, newColorClass) {
    // firstly remove the old background color
    if (element.classList.contains(oldColorClass)) {
      element.classList.remove(oldColorClass);
      element.classList.remove('transition-bg-change');
    }
    // apply the new background color class
    if (!element.classList.contains(newColorClass)) {
      element.classList.add(newColorClass);
      element.classList.add('transition-bg-change');
    }
  }

  /** This function applies a @newColor to an array of children of the @elements and also removes the old color class */
  changeTextColor(elements, prevColor, newColor) {
    for (const child of elements) {
      // check if @newColor is already applied. If it is, stop and leave - no need to keep reapplying the same color
      if (!child.classList.contains(newColor)) {
        child.classList.remove(prevColor); // remove the old color class
        child.classList.add(newColor); // add a new color class
      }
    }
  }

  changeOpacity(element, newOpacity) {
    if (element.style.opacity !== newOpacity) {
      element.style.opacity = newOpacity.toString();
    }
  }

  changeNavbarBoxShadow(isOn) {
    if (isOn /*&& window.innerWidth >= 991.92*/ ) {
      navbar.classList.add('box-shadow-navbar');
    } else {
      navbar.classList.remove('box-shadow-navbar');
    }
  }

  changeLoadingBarWidth() {
    const scrollY = window.scrollY; // current scroll position in Y axis
    const totalHeight = document.body.scrollHeight; // total scroll height of the page in Y axis
    const windowWidth = window.innerWidth; // total window width

    const loadingBarWidth = (((scrollY / (totalHeight - 1000)) * windowWidth)); // - 1000 is for a bug fix when at the end of the page, the loading bar was not 100% width of the total window width
    // set loading bar width based on Y-axis scroll position
    loadingBar.style.width = loadingBarWidth.toString() + 'px';
  }

  // when the user scrolls, this function finds the position/section on the webpage and highlights given section in the navbar menu.
  changePositionInNavbar(element, navItemIndex) {
    if (!element) {
      return;
    }

    const {
      top,
      bottom
    } = element.getBoundingClientRect();

    if (top <= 250 && bottom >= 250) {
      navItems[navItemIndex].classList.add('border-bottom-gold');
    } else {
      navItems[navItemIndex].classList.remove('border-bottom-gold');
    }
  };
}

const changer = new Changer();

const animateFlags = () => {
  const flagNames = ['Czech', 'French', 'US'];
  const interval = 1.5; // seconds
  let counter = 0;

  setInterval(() => {
    if (counter > flagNames.length - 1) {
      counter = 0;
    }
    const currentFlag = flagNames[counter++];
    if (flagInANutshell) {
      flagInANutshell.src = `assets/img/icons/lineal/${currentFlag}-Flag-icon.webp`;
    }
  }, interval * 1000); // change the flags in an interval
};

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

const closeNavBar = () => {
  const navbarMobile = document.getElementById("navbar-mobile");
  const backdrop = document.getElementsByClassName("offcanvas-backdrop")[0];

  if (navbarMobile) {
    navbarMobile.classList.remove("show");
  }

  if (backdrop) {
    backdrop.classList.remove("show");
  }
};

// const setAnchorListeners = () => {
//   for (const link of linkHooks) {
//     // a listener must be assigned to each link because it's an HTML collection
//     link.addEventListener('click', event => {
//       setTimeout(() => {
//         window.scrollBy(0, -75); // wait a bit, then scroll up to the title of the section/location
//       }, 800);
//       window.location.assign(location.href ? location.href + event.target.hash : event.target.hash); // scroll to the @hash location (e.g. #about-me)
//     });
//   }
// };

const hideElement = (element, isHidden) => {
  if (!element) {
    return;
  }

  if (isHidden) {
    element.style.display = 'none';
  } else {
    element.style.display = 'flex';
  }
};

/** sets an event listener to testimonials to ensure a smooth effect on hover */
const setCardsListener = () => {
  if (window.innerWidth <= 991.92) {
    return;
  }

  for (const card of swipeCards) {
    card.addEventListener('mouseover', () => {
      card.classList.add('hover-effect-on');
      card.classList.remove('hover-effect-off');
    });

    card.addEventListener('mouseleave', () => {
      card.classList.add('hover-effect-off');
      card.classList.remove('hover-effect-on');
    });
  }

};

/**
 Hides all inactive FAQ items so that only the lastly activated item is visible
*/
const hideInactiveItems = (list) => {
  // hide all unused accordion items in the faq
  for (const parent of list.children) {
    parent.children[0].children[0].classList.add('collapsed');
    parent.children[1].classList.remove('show');
  }
};

window.addEventListener('scroll', () => {
  changer.changePositionInNavbar(home, 0);
  changer.changePositionInNavbar(aboutMe, 1);
  changer.changePositionInNavbar(howItWorks, 2);
  changer.changePositionInNavbar(testimonials, 3);
  changer.changePositionInNavbar(pricing, 4);
  changer.changePositionInNavbar(faq, 5);
  changer.changeLoadingBarWidth();
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    changer.changeBGColor(navbar, 'bg-transparent', 'bg-white');
    changer.changeTextColor(navbarNavLinks, 'text-white', 'text-black');
    changer.changeNavbarBoxShadow(true);

    if (home && (window.scrollY > home.getBoundingClientRect().bottom + 15)) {
      hideElement(bookALesson, true);
    } else {
      hideElement(bookALesson, false);
    }
  } else {
    changer.changeBGColor(navbar, 'bg-white', 'bg-transparent');
    changer.changeTextColor(navbarNavLinks, 'text-black', 'text-white');
    changer.changeNavbarBoxShadow(false);
    changer.changeOpacity(navbar, 1.0);
  }
});

if (accordion1 && accordion2) {
  accordion1.addEventListener('click', () => hideInactiveItems(accordion1));
  accordion2.addEventListener('click', () => hideInactiveItems(accordion2));
}

document.addEventListener("DOMContentLoaded", () => {
  animateFlags();
  changer.changeLoadingBarWidth();
  setCardsListener();
  tagTodayInOpeningHours(new Date().getDay());
});
