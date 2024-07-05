const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi)) {
    return helpers.message('id tidak valid');
  }

  return value;
};

const password = (value, helpers) => {
  if (value.length < 6) {
    return helpers.message('Kata sandi Anda harus memiliki setidaknya 6 karakter');
  }

  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('Kata sandi Anda harus memiliki setidaknya 1 huruf dan 1 angka');
  }

  return value;
};

module.exports = {
  objectId,
  password,
};
