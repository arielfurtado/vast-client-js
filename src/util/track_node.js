import { util } from './util';

export default function track(URLTemplates, macros, options) {
  const URLs = util.resolveURLTemplates(URLTemplates, macros, options);

  URLs.forEach((URL) => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', URL, true);
    xhr.onload = function () {
      if (!(xhr.status >= 200 && xhr.status < 300)) {
        console.warn('Ad Track Request failed with status', xhr.status);
      }
    };
    xhr.onerror = function () {
      console.warn('Ad Track Request error', xhr.status, xhr.statusText);
    };
    xhr.send();
  });
}
