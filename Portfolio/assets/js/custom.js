
const navbarNav = document.getElementsByClassName('navbar-nav')[3];

const setNavbarFixed = isFixed => {
  if(!isFixed) {
    navbarNav.classList.remove('navbar-fixed');
  } else {
    navbarNav.classList.add('navbar-fixed');
  };
};

window.addEventListener('scroll', () => {

  if(window.scrollY >= 150) {
    setNavbarFixed(true);
  } else {
    setNavbarFixed(false);
  }
});
