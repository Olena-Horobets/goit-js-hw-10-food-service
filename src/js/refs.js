export const refs = {
  body: document.querySelector('body'),
  themeSwitchToggle: document.querySelector('#theme-switch-toggle'),
  cardsList: document.querySelector('.js-menu'),

  showCartBtn: document.querySelector('[data-action="show-cart"]'),
  cartList: document.querySelector('.cart-list'),
  closeCartBtn: document.querySelector('.cart-list__close'),
};

export const Cart = {
  PROPERTY: 'items',
  VALUE: {},
};
