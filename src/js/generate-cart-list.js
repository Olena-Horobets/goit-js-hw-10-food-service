import cartListTpl from '../templates/cart-list.hbs';
import './save-items-to-cart';

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

      addItemsToCart();
    }
  });
};

const getItemData = function (itemId) {
  let item = menu.find(el => el.id === itemId);

  if (!VALUE[item.name]) {
    VALUE[item.name] = {};
    VALUE[item.name].price = item.price;
    VALUE[item.name].amount = 1;
  } else {
    VALUE[item.name].amount += 1;
  }
};

const addItemsToCart = function () {
  localStorage.setItem(PROPERTY, JSON.stringify(VALUE));
};

defineCartItems();

const getCartItems = function () {
  const list = Object.entries(JSON.parse(localStorage.getItem(PROPERTY)));

  const dataBase = list.reduce((acc, el) => {
    const item = {};

    item.name = el[0];
    item.amount = el[1].amount;
    item.price = el[1].price;
    acc.push(item);
    return acc;
  }, []);

  return dataBase;
};

const dataBase = getCartItems();

const list = cartListTpl(dataBase);

refs.cartList.insertAdjacentHTML('afterbegin', list);

refs.showCartBtn.addEventListener('click', e => {
  refs.cartList.closest('div').classList.remove('is-hidden');

  refs.decreaseBtn.addEventListener('click', e => {});

  refs.closeCartBtn.addEventListener('click', e => {
    refs.cartList.closest('div').classList.add('is-hidden');
  });
});
