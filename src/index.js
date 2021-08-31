import './sass/main.scss';

import { updateBodyClasslist } from './js/theme-switch';
import { switchThemes } from './js/theme-switch';

import { generateCards } from './js/generate-cards';

// import { refs } from './js/refs';
// import menu from './db/menu.json';

import './js/save-items-to-cart';
import './js/generate-cart-list';

updateBodyClasslist();
switchThemes();

generateCards();
