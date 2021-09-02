import './sass/main.scss';

import { updateBodyClasslist } from './js/theme-switch';
import { switchThemes } from './js/theme-switch';

import { generateCards } from './js/generate-cards';

import './js/save-items-to-storage';
import './js/generate-cart-list';

updateBodyClasslist();
switchThemes();

generateCards();
