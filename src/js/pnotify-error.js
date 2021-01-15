import {error} from '../../node_modules/@pnotify/core';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';


export default function showError(errorMessage) {
  error({
    type: 'error',
    text: errorMessage,
    delay: 3000,
    closer: false,
    closerHover: true,
    sticker: false,
    addClass: 'notification',
    icon: false,
    width: '250px',
  });
}

