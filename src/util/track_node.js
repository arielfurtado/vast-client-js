import { util } from './util';

export default function track(URLTemplates, macros, options) {
  const URLs = util.resolveURLTemplates(URLTemplates, macros, options);

  URLs.forEach((URL) => {
    const https = require('https');
    https.get(URL);
  });
}
