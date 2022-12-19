import {initBurger} from './modules/init-burger-action';
import {initDateList} from './modules/init-date-list';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  // Modules
  // ---------------------------------
  window.addEventListener('load', () => {
    initBurger();
    initDateList();
  });
});

// ---------------------------------
