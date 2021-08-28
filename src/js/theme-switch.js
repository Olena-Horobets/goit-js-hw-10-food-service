import { log } from 'handlebars';
import { refs } from './refs';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
  PROPERTY: 'theme',
};

const { LIGHT, DARK, PROPERTY } = Theme;

export const updateBodyClasslist = function () {
  const currentTheme = refs.body.classList.value;
  const nextTheme = localStorage.getItem(PROPERTY);

  if (currentTheme) {
    refs.body.classList.toggle(currentTheme);
    refs.body.classList.toggle(nextTheme);
    if (refs.body.classList.contains(DARK)) {
      refs.themeSwitchToggle.checked = true;
    }
  }
};

export const switchThemes = function () {
  refs.themeSwitchToggle.addEventListener('change', e => {
    if (!e.target.checked) {
      localStorage.setItem(Theme.PROPERTY, Theme.LIGHT);
    } else {
      localStorage.setItem(Theme.PROPERTY, Theme.DARK);
      refs.themeSwitchToggle.checked;
    }
    updateBodyClasslist();
  });
};
