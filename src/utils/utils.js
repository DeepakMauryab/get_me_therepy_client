export const generateRandomNumber = length => {
  let number = '';
  const naturalNumber = '123456789';
  const digitLength = naturalNumber.length;
  for (let i = 0; i < length; i++) {
    number += naturalNumber[Math.floor(Math.random() * digitLength)];
  }

  return number;
};
