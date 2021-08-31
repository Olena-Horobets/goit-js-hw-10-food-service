import { refs } from './refs';
import menu from '../db/menu.json';

export const Cart = {
  PROPERTY: 'items',
  VALUE: {},
};

const { PROPERTY, VALUE } = Cart;

const defineCartItems = function () {
  refs.cardsList.addEventListener('click', e => {
    const itemId = e.target.closest('li').getAttribute('data-id');

    if (!e.target.classList.contains('card__button')) {
      return;
    } else {
      console.log(getItemData(itemId));
      console.log(VALUE);
      addItemsToCart();
    }
  });
};

const getItemData = function (itemId) {
  let item = menu.find(el => el.id === itemId);
  console.log(VALUE);
  console.log(item);
  if (!VALUE[item.name]) {
    VALUE[item.name] = {};
    VALUE[item.name].price = item.price;
    VALUE[item.name].amount = 1;
  } else {
    VALUE[item.name].amount += 1;
  }
  console.log(VALUE);
};

const addItemsToCart = function () {
  console.log(JSON.stringify(VALUE));
  localStorage.setItem(PROPERTY, JSON.stringify(VALUE));
};

defineCartItems();
