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
      VALUE.push(item);
      addItemsToCart();
    }
  });
};

const getItemData = function (itemId) {
  let obj = menu.reduce((acc, el, idx, arr) => {
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
      acc.isItem = function () {
        let passed = VALUE.find(el => el.name === obj.name);
        passed ? VALUE[VALUE.indexOf(passed)].increaseAmount() : VALUE.push(this);
      };
    }
    return acc;
  }, {});

  // obj.isItem();
  return obj;
};

const addItemsToCart = function () {
  localStorage.setItem(PROPERTY, JSON.stringify(VALUE));
};

defineCartItems();

console.log(localStorage.items);

const getCartItems = JSON.parse(localStorage.getItem(PROPERTY));
console.log(
  getCartItems.reduce((acc, el, idx, arr) => {
    console.log(el.name);
    if (acc.el.name) {
      console.log(idx);
    }
  }, []),
);
