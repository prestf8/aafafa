"use strict";
const password = document.querySelector(".display__password");
const copy = document.querySelector(".display__copy");
const settingsForm = document.querySelector(".settings");
let generateASCII = function () {
    let ascii = "";
    for (let l = 33; l < 127; l++) {
        ascii += String.fromCharCode(l);
    }
    return ascii;
};
let copyText = () => {
    password.select(); //THIS
    document.execCommand("copy");
    alert(`Copied ${password.value} to your clipboard.`);
};
function generateNumber(max) {
    return (Math.floor(Math.random() * max));
}
function generatePassword(e) {
    let possible = "";
    let result = "";
    e.preventDefault();
    // console.log(String.fromCharCode(generateNumber()));
    let inputs = settingsForm.querySelectorAll(".settings__input");
    let [lengthInput, uppercaseInput, lowercaseInput, numbersInput, symbolsInput] = Array.from(inputs);
    if (uppercaseInput.checked)
        possible += ascii.substring(32, 58);
    if (lowercaseInput.checked)
        possible += ascii.substring(64, 90);
    if (numbersInput.checked)
        possible += ascii.substring(15, 25);
    if (symbolsInput.checked)
        possible += ascii.substring(0, 14) + ascii.substring(26, 33) + ascii.substring(59, 65) + ascii.substring(91, 95);
    let iterations = parseInt(lengthInput.value);
    for (let i = 0; i < iterations; i++) {
        if (!possible[generateNumber(possible.length)]) {
            result = "Non-Random password";
            break;
        }
        result += possible[generateNumber(possible.length)];
    }
    password.value = result;
}
const ascii = generateASCII(); // rip hoisting
copy.addEventListener("click", copyText);
settingsForm.addEventListener("submit", generatePassword);
