import { DEFAULT_TIMEOUT } from './consts';

const fs = require('fs');
const uri = require('url');
const DOMParser = require('@xmldom/xmldom').DOMParser;

function get(url, options, cb) {
  url = uri.parse(url);

  if (url.protocol === 'file:') {
    fs.readFile(uri.fileURLToPath(url.href), 'utf8', function (err, data) {
      if (err) {
        return cb(err);
      }
      const xml = new DOMParser().parseFromString(data);
      cb(null, xml, { byteLength: Buffer.from(data).byteLength });
    });
  } else {
    const timeout = options.timeout || DEFAULT_TIMEOUT;
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url.href, true);
    xhr.timeout = timeout;

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const xml = new DOMParser().parseFromString(xhr.responseText);
        cb(null, xml, {
          byteLength: xhr.responseText.length,
          statusCode: xhr.status,
        });
      } else {
        cb(new Error(`Request failed with status ${xhr.status}`), null, {
          statusCode: xhr.status,
        });
      }
    };

    xhr.onerror = function () {
      cb(new Error('Request error'), null, {
        statusCode: xhr.status || 500,
      });
    };

    xhr.ontimeout = function () {
      cb(
        new Error(`NodeURLHandler: Request timed out after ${timeout} ms.`),
        null,
        {
          statusCode: 408, // Request timeout
        }
      );
    };

    xhr.send();
  }
}

export const nodeURLHandler = {
  get,
};

export default nodeURLHandler;
