import { refs } from './refs';
import { Cart } from './refs';

import cartListTpl from '../templates/cart-list.hbs';
import emptyCart from '../templates/empty-cart.hbs';

let { PROPERTY, VALUE } = Cart;

const getCartItemsFromLocalStorage = function () {
  if (!localStorage[PROPERTY]) {
    return;
  } else {
    const list = Object.entries(JSON.parse(localStorage.getItem(PROPERTY)));

    return list.reduce((acc, el) => {
      const item = {};

      item.id = el[0];
      item.amount = el[1].amount;
      item.price = el[1].price;
      item.name = el[1].name;
      acc.push(item);

      return acc;
    }, []);
  }
};

// -------------------------

refs.showCartBtn.addEventListener('click', e => {
  let list = '';
  if (localStorage[PROPERTY]) {
    list = cartListTpl(getCartItemsFromLocalStorage());
  } else {
    list = emptyCart();
  }
  refs.cartList.innerHTML = list;
  refs.cartList.closest('div').classList.remove('is-hidden');

  if (localStorage[PROPERTY]) {
    refs.cartList.addEventListener('click', onCartItemClick);
  }

  refs.closeCartBtn.addEventListener('click', e => {
    refs.cartList.closest('div').classList.add('is-hidden');
  });
});

let onCartItemClick = function (e) {
  const button = e.target.getAttribute('data-action');
  if (!button) {
    return;
  }

  const itemId = e.target.closest('li').getAttribute('data-id');

  const amountValue = document.querySelector('[data-value = "' + itemId + '"]');

  VALUE = JSON.parse(localStorage[PROPERTY]);

  let newAmount;
  if (button === 'decrease') {
    newAmount = decreaseAmount(VALUE, itemId);
  } else {
    newAmount = increaseAmount(VALUE, itemId);
  }

  VALUE[itemId].amount = newAmount;
  localStorage.setItem(PROPERTY, JSON.stringify(VALUE));
  amountValue.textContent = `${newAmount} шт.`;
  getCartItemsQuantity();
};

export const decreaseAmount = function (VALUE, id) {
  if (VALUE[id].amount < 1) {
    return 0;
  }
  return (VALUE[id].amount -= 1);
};

export const increaseAmount = function (VALUE, id) {
  return (VALUE[id].amount += 1);
};

// ------------------
export const getCartItemsQuantity = function () {
  if (localStorage[PROPERTY]) {
    refs.itemsQuant.classList.remove('is-hidden');
    VALUE = JSON.parse(localStorage[PROPERTY]);

    let quantity = Object.values(VALUE).reduce((acc, el) => (acc += el.amount), 0);

    refs.itemsQuant.textContent = quantity;
    if (quantity === 0) {
      refs.itemsQuant.classList.add('is-hidden');
    }
  }
};

getCartItemsQuantity();
