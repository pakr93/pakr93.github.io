let menuOpen = false;
const backdrop = document.getElementById('backdrop');
const mobileNav = document.getElementById('mobile-nav');

const menuButton = document.querySelector('#menu-button');
menuButton.addEventListener('click', () => {
  if(!backdrop.classList.contains('closed')) {
    backdrop.classList.add('closed');
    mobileNav.classList.add('closed');
  } else {
    backdrop.classList.remove('closed');
    mobileNav.classList.remove('closed');
  }
});
backdrop.addEventListener('click', () => {
  backdrop.classList.add('closed');
    mobileNav.classList.add('closed');
});

mobileNav.addEventListener('click', (event) => {
  console.log(event);
  if(event.target.nodeName === 'LI') {
    backdrop.classList.add('closed');
    mobileNav.classList.add('closed');
  }
});