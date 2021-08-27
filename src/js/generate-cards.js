import { refs } from './refs';
import menu from '../db/menu.json';
import menuItemTpl from '../templates/menu-item.hbs';

export const generateCards = function () {
  const menuMarkup = menuItemTpl(menu);

  refs.cardsList.insertAdjacentHTML('beforeend', menuMarkup);
};
