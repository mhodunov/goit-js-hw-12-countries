import {error} from '../../node_modules/@pnotify/core';
import '../../node_modules/@pnotify/core/dist/BrightTheme.css';


export default function showError(errorMessage) {
  error({
    text: errorMessage,
    delay: 3000,
    closer: false,
    closerHover: true,
    sticker: false,
  });
}

