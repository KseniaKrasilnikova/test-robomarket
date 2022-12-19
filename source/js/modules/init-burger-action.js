import {ScrollLock} from '../utils/scroll-lock';

const breakpointTablet = window.matchMedia('(min-width:768px)');
const openButton = document.querySelector('.btn-open-menu');
const closeButton = document.querySelector('.btn-close-menu');
const mobileMenu = document.querySelector('.mobile-nav__wrapper');
const overlay = document.querySelector('.bg-overlay');
const header = document.querySelector('.mobile-nav');
const scrollLock = new ScrollLock();
const active = 'active';

const openBurgerMenu = () => {
  if (breakpointTablet.matches) {
    return;
  }
  openButton.classList.add('hide');
  closeButton.classList.add('show');
  overlay.classList.add(active);
  header.classList.add('mobile-active');
  mobileMenu.classList.add(active);
};

const closeMenu = () => {
  closeButton.classList.remove('show');
  openButton.classList.remove('hide');
  mobileMenu.classList.remove(active);
  header.classList.remove('mobile-active');
  overlay.classList.remove(active);
};

const closeMenuOnResize = () => {
  if (mobileMenu.classList.contains('active')) {
    closeMenu();
    scrollLock.enableScrolling()
  }
};

const initBurger = () => {
  if (!openButton) {
    return;
  }

  breakpointTablet.addListener(closeMenuOnResize);
  window.addEventListener('orientationchange', closeMenu);

  openButton.addEventListener('click', () => {
    openBurgerMenu();
    scrollLock.disableScrolling();
  });

  closeButton.addEventListener('click', () => {
    closeMenu();
    scrollLock.enableScrolling();
  });
};

export {initBurger};
