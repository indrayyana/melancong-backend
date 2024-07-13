const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi)) {
    return helpers.message('Invalid id');
  }

  return value;
};

const password = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('Password must be at least 6 characters');
  }

  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Password must contain at least 1 letter and 1 number');
  }

  return value;
};

module.exports = {
  objectId,
  password,
};
