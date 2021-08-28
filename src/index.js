import './sass/main.scss';

import { updateBodyClasslist } from './js/theme-switch';
import { switchThemes } from './js/theme-switch';

import { generateCards } from './js/generate-cards';

updateBodyClasslist();
switchThemes();

generateCards();
