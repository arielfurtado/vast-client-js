const http = require('http');
const https = require('https');
const url = require('url');

import { util } from './util';

export default function track(URLTemplates, macros, options) {
  const URLs = util.resolveURLTemplates(URLTemplates, macros, options);

  URLs.forEach((URL) => {
    const parsedURL = url.parse(URL);
    const protocol = parsedURL.protocol;
    const httpModule = protocol === 'https:' ? https : http;
    httpModule.get(URL);
  });
}
