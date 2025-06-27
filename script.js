// Password character sets
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-={}[]:;"<>,.?/|~';

const passwordInput = document.getElementById('password');
const copyBtn = document.getElementById('copy-btn');
const generateBtn = document.getElementById('generate-btn');
const uppercaseBox = document.getElementById('uppercase');
const lowercaseBox = document.getElementById('lowercase');
const numbersBox = document.getElementById('numbers');
const symbolsBox = document.getElementById('symbols');
const lengthInput = document.getElementById('length');
const lengthRange = document.getElementById('length-range');
const themeSwitch = document.getElementById('theme-switch');

function generatePassword() {
    let chars = '';
    if (uppercaseBox.checked) chars += UPPERCASE;
    if (lowercaseBox.checked) chars += LOWERCASE;
    if (numbersBox.checked) chars += NUMBERS;
    if (symbolsBox.checked) chars += SYMBOLS;
    if (!chars) return '';
    let password = '';
    for (let i = 0; i < lengthInput.value; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

function updatePassword() {
    passwordInput.value = generatePassword();
}

generateBtn.addEventListener('click', updatePassword);

// Sync range and number input
lengthInput.addEventListener('input', () => {
    lengthRange.value = lengthInput.value;
});
lengthRange.addEventListener('input', () => {
    lengthInput.value = lengthRange.value;
});

// Copy to clipboard
copyBtn.addEventListener('click', () => {
    passwordInput.select();
    document.execCommand('copy');
    copyBtn.innerHTML = '✔';
    setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-clone"></i>';
    }, 1000);
});

// Theme toggle
function setTheme(light) {
    if (light) {
        document.body.classList.add('light');
    } else {
        document.body.classList.remove('light');
    }
}
themeSwitch.addEventListener('change', () => {
    setTheme(themeSwitch.checked);
    localStorage.setItem('theme', themeSwitch.checked ? 'light' : 'dark');
});
// Load theme from storage
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        themeSwitch.checked = true;
        setTheme(true);
    } else {
        themeSwitch.checked = false;
        setTheme(false);
    }
    passwordInput.value = '';
}); 