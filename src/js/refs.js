import menu from '../db/menu.json';

export const refs = {
  body: document.querySelector('body'),
  themeSwitchToggle: document.querySelector('#theme-switch-toggle'),
  cardsList: document.querySelector('.js-menu'),

  showCartBtn: document.querySelector('[data-action="show-cart"]'),
  cartList: document.querySelector('.cart-list'),
  closeCartBtn: document.querySelector('.cart-list__close'),
  itemsQuant: document.querySelector('.cart-amount'),
};

export const Cart = {
  PROPERTY: 'items',
  VALUE: {},

  setValueFromStorage() {
    if (localStorage[this.PROPERTY]) {
      this.VALUE = JSON.parse(localStorage[this.PROPERTY]);
    }
  },

  getItemData(itemId) {
    let item = menu.find(el => el.id === itemId);
    this.setValueFromStorage();

    if (!this.VALUE[itemId]) {
      this.VALUE[itemId] = { price: item.price, amount: 1, name: item.name };
    } else {
      this.increaseAmount(itemId);
    }
  },

  addItemsToCart() {
    localStorage.setItem(this.PROPERTY, JSON.stringify(this.VALUE));
  },

  getQuantityForToolbar() {
    return Object.values(this.VALUE).reduce((acc, el) => (acc += el.amount), 0);
  },

  decreaseAmount(id) {
    if (this.VALUE[id].amount < 1) {
      delete this.VALUE[id];
      return 0;
    }
    return (this.VALUE[id].amount -= 1);
  },

  increaseAmount(id) {
    return (this.VALUE[id].amount += 1);
  },
};
