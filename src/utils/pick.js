const pick = (object, keys) => keys.reduce((obj, key) => {
  if (object && Object.prototype.hasOwnProperty.call(object, key)) {
    /* eslint-disable no-param-reassign */
    obj[key] = object[key];
  }

  return obj;
}, {});

export default pick;
