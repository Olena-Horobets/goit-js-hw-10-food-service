import { refs } from './refs';
import { Cart } from './refs';

import cartListTpl from '../templates/cart-list.hbs';
import emptyCart from '../templates/empty-cart.hbs';

let {
  PROPERTY,
  addItemsToCart,
  setValueFromStorage,
  decreaseAmount,
  increaseAmount,
  getQuantityForToolbar,
} = Cart;

const getCartItemsFromLocalStorage = function () {
  const list = Object.entries(JSON.parse(localStorage.getItem(PROPERTY)));

  return list.reduce((acc, el) => {
    const item = {};
    if (el[1].amount === 0) {
      return acc;
    } else {
      item.id = el[0];
      item.amount = el[1].amount;
      item.price = el[1].price;
      item.name = el[1].name;
      acc.push(item);

      return acc;
    }
  }, []);
};

// -------------------------

refs.showCartBtn.addEventListener('click', e => {
  let list = '';

  if (
    !localStorage.getItem(PROPERTY) ||
    Object.keys(JSON.parse(localStorage[PROPERTY])).length === 0
  ) {
    list = emptyCart();
  } else {
    list = cartListTpl(getCartItemsFromLocalStorage());
    refs.cartList.addEventListener('click', onCartItemClick);
  }
  refs.cartList.innerHTML = list;
  refs.cartList.closest('div').classList.remove('is-hidden');

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

  setValueFromStorage.call(Cart);

  let newAmount;
  if (button === 'decrease') {
    newAmount = decreaseAmount.call(Cart, itemId);
  } else {
    newAmount = increaseAmount.call(Cart, itemId);
  }

  addItemsToCart.call(Cart);
  amountValue.textContent = `${newAmount} шт.`;
  getCartItemsQuantity();
};

// ------------------
export const getCartItemsQuantity = function () {
  if (localStorage[PROPERTY]) {
    refs.itemsQuant.classList.remove('is-hidden');

    setValueFromStorage.call(Cart);
    let quantity = getQuantityForToolbar.call(Cart);

    refs.itemsQuant.textContent = quantity;
    if (quantity === 0) {
      refs.itemsQuant.classList.add('is-hidden');
    }
  }
};

getCartItemsQuantity();
