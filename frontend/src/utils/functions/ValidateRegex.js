const validateEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\+\d{1,3}-\d{3,14}$/;
  return regex.test(phoneNumber);
};

const validateInteger = (number) => {
  const regex = /^-?\d+$/;
  return regex.test(number);
};

const validateDecimal = (number) => {
  const regex = /^-?\d+(\.\d+)?$/;
  return regex.test(number);
};

const validateDate = (date) => {
  const regex =
    /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19\d{2}|20[0-9]{2})$/;
  return regex.test(date);
};

const validateURL = (url) => {
  const regex =
    /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(:[0-9]+)?(\/[\w/.-]*)*$/;
  return regex.test(url);
};

const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
  return regex.test(password);
};

export {
  validateEmail,
  validatePhoneNumber,
  validateInteger,
  validateDecimal,
  validateDate,
  validateURL,
  validatePassword,
};
