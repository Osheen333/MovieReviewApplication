require('dotenv').config();

module.exports.validateRegisterInput = (
  name,
  email,
  password,
  confirmPassword
) => {
  const emailRegex =
    '/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/';

  const errors = {};

  if (name.trim() === '') {
    errors.name = 'name must not empty';
  }
  if (email.trim() === '') {
    errors.email = 'email mut not empty';
  } else {
    const regEx =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email.match(regEx)) {
      errors.email = 'email must be vallid';
    }
  }
  if (password.trim() === '') {
    errors.password = 'password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = ' password must be equal';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
module.exports.validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === '') {
    errors.email = 'email mut not empty';
  } else {
    const regEx =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!email.match(regEx)) {
      errors.email = 'email must be vallid';
    }
  }
  if (password.trim() === '') {
    errors.password = 'Password must not empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateChangePassword = (password, confirmPassword) => {
  const errors = {};

  if (password.trim() === '') {
    errors.password = 'password must not empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = ' password must be equal';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
