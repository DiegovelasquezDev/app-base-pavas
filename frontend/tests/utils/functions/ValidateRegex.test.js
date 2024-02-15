import {
  validateEmail,
  validatePhoneNumber,
  validateInteger,
  validateDecimal,
  validateDate,
  validateURL,
  validatePassword,
} from '../../../src/utils/functions';

describe('validateEmail', () => {
  test('caso válido', () => {
    expect(validateEmail('test@example.com')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validateEmail('invalid.email@.com')).toBe(false);
  });

});



describe('validatePhoneNumber', () => {
  test('caso válido', () => {
    expect(validatePhoneNumber('+1-1234567890')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validatePhoneNumber('+999-1234')).toBe(false);
  });

});

describe('validateInteger', () => {
  test('caso válido', () => {
    expect(validateInteger('123')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validateInteger('12.34')).toBe(false);
  });


});

describe('validateDecimal', () => {
  test('caso válido', () => {
    expect(validateDecimal('12.34')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validateDecimal('abc')).toBe(false);
  });

});

describe('validateDate', () => {
  test('caso válido', () => {
    expect(validateDate('01/12/2023')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validateDate('25/05/2000')).toBe(false);
  });

});

describe('validateURL', () => {
  test('caso válido', () => {
    expect(validateURL('http://www.example.com')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validateURL('invalid-url')).toBe(false);
  });

});

describe('validatePassword', () => {
  test('caso válido', () => {
    expect(validatePassword('StrongPass1!')).toBe(true);
  });

  test('caso inválido', () => {
    expect(validatePassword('weakpassword')).toBe(false);
  });

});
