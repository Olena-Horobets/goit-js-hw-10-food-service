import { refs } from './refs';
import menu from '../db/menu.json';

import { Cart } from './refs';
import { getCartItemsQuantity } from './generate-cart-list';

const { PROPERTY, VALUE } = Cart;

const getItemData = function (itemId, num = 1) {
  let item = menu.find(el => el.id === itemId);

  if (!VALUE[itemId]) {
    VALUE[itemId] = {};
    VALUE[itemId].price = item.price;
    VALUE[itemId].amount = num;
    VALUE[itemId].name = item.name;
  } else {
    VALUE[itemId].amount += 1;
  }
};

const addItemsToCart = function () {
  localStorage.setItem(PROPERTY, JSON.stringify(VALUE));
};

refs.cardsList.addEventListener('click', e => {
  const itemId = e.target.closest('li').getAttribute('data-id');

  if (!e.target.classList.contains('card__button')) {
    return;
  } else {
    getItemData(itemId);

    addItemsToCart();
    getCartItemsQuantity();
  }
});
