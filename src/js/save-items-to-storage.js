import { refs } from './refs';

import { Cart } from './refs';
import { getCartItemsQuantity } from './generate-cart-list';

const { addItemsToCart, getItemData } = Cart;

refs.cardsList.addEventListener('click', e => {
  const itemId = e.target.closest('li').getAttribute('data-id');

  if (!e.target.classList.contains('card__button')) {
    return;
  }

  getItemData.call(Cart, itemId);
  addItemsToCart.call(Cart);
  getCartItemsQuantity();
});
