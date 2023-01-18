import { passwordStrength } from 'check-password-strength';

const length = document.getElementById('length');
const lengthText = document.getElementById('lengthText');
const passwordField = document.getElementById('password');
const strength = document.getElementById('strength');
const generateBtn = document.getElementById('generate');

const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

const utils = {
  getRandomNumberBetween: (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min),
  getCharsFromArr: (array, num) => {
    let chars = '';
    for (let i = 0; i < num; i++) {
      const randNumber = utils.getRandomNumberBetween(0, array.length - 1);
      randNumber % 2 === 0
        ? (chars += array[randNumber])
        : (chars += array[randNumber].toUpperCase());
    }
    return chars;
  },
};

function generatePassword() {
  const passLength = length.value;
  const includeNumbers = document.getElementById('includeNumbers').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;

  let tempPassword = '';
  if (includeNumbers) {
    tempPassword += utils.getCharsFromArr(
      numbers,
      utils.getRandomNumberBetween(3, passLength / 3)
    );
  }
  if (includeSymbols) {
    tempPassword += utils.getCharsFromArr(
      symbols,
      utils.getRandomNumberBetween(3, passLength / 3)
    );
  }

  tempPassword += utils.getCharsFromArr(
    letters,
    passLength - tempPassword.length
  );

  passwordField.value = tempPassword
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  const passwordQuality = passwordStrength(tempPassword, [
    {
      id: 0,
      value: 'Too weak',
      minDiversity: 0,
      minLength: 8,
    },
    {
      id: 1,
      value: 'Weak',
      minDiversity: 2,
      minLength: 8,
    },
    {
      id: 2,
      value: 'Medium',
      minDiversity: 4,
      minLength: 12,
    },
    {
      id: 3,
      value: 'Strong',
      minDiversity: 4,
      minLength: 16,
    },
  ]);

  switch (passwordQuality.value) {
    case 'Too weak':
      strength.value = utils.getRandomNumberBetween(0, 10);
      break;
    case 'Weak':
      strength.value = utils.getRandomNumberBetween(10, 30);
      break;
    case 'Medium':
      strength.value = utils.getRandomNumberBetween(30, 74);
      break;
    case 'Strong':
      strength.value = utils.getRandomNumberBetween(75, 100);
      break;
  }
}

// update the meter tag (check pw strength)

function handlePwClick(e) {
  if (e.currentTarget.value === '') return;

  const pwToCopy = passwordField.value;
  navigator.clipboard.writeText(pwToCopy);
  passwordField.value = 'Copied to clipboard!';

  setTimeout(() => {
    passwordField.value = pwToCopy;
  }, 2000);
}

passwordField.addEventListener('click', handlePwClick);
generateBtn.addEventListener('click', generatePassword);

length.addEventListener('change', (e) => {
  lengthText.textContent = e.currentTarget.value;
});
