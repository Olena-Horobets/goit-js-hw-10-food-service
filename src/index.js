import './sass/main.scss';

import { updateBodyClasslist } from './js/theme-switch';
import { switchThemes } from './js/theme-switch';

import { generateCards } from './js/generate-cards';

import { refs } from './js/refs';
import menu from './db/menu.json';

updateBodyClasslist();
switchThemes();

generateCards();

const Cart = {
  PROPERTY: 'items',
  VALUE: [],
};

const { PROPERTY, VALUE } = Cart;

const defineCartItems = function () {
  refs.cardsList.addEventListener('click', e => {
    const itemId = e.target.closest('li').getAttribute('data-id');

    if (!e.target.classList.contains('card__button')) {
      return;
    } else {
      const item = getItemData(itemId);

      for (let product of VALUE) {
        if (product.name === item.name) {
          product.increaseAmount();
          console.log(999);
        } else {
          VALUE.push(item);
        }
        addItemsToCart();
      }
    }
  });
};

const getItemData = function (itemId) {
  return menu.reduce((acc, el, idx, arr) => {
    if (el.id === itemId) {
      acc.name = el.name;
      acc.price = el.price;
      acc.amount = 1;
      acc.increaseAmount = function () {
        this.amount += 1;
      };
      acc.deccreaseAmount = function () {
        this.amount -= 1;
      };
    }
    return acc;
  }, {});
};

const addItemsToCart = function () {
  localStorage.setItem(PROPERTY, JSON.stringify(VALUE));
  console.log(localStorage.getItem(PROPERTY));
};

defineCartItems();
