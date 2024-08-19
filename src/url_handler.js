import handler from '_URLHandler_';

function get(url, options, cb) {
  // Allow skip of the options param
  if (!cb) {
    if (typeof options === 'function') {
      cb = options;
    }
    options = {};
  }

  return handler.get(url, options, cb);
}

export const urlHandler = {
  get,
};
