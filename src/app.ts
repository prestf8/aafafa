const password = document.querySelector(".display__password") as HTMLInputElement;
const copy = document.querySelector(".display__copy") as HTMLParagraphElement;
const settingsForm = document.querySelector(".settings") as HTMLFormElement;

let generateASCII = function(): string {
    let ascii: string | undefined = "";
    for(let l:number=33; l < 127; l++) {
        ascii += String.fromCharCode(l);
    }
    return ascii;
}

let copyText = (): void => {
    password.select(); //THIS
    document.execCommand("copy");
    alert(`Copied ${password.value} to your clipboard.`);
}

function generateNumber(max:number):number {
    return (Math.floor(Math.random()*max));
}

function generatePassword(e: Event): void {
    let possible:string | undefined = "";
    let result:string | undefined = "";

    e.preventDefault();

    // console.log(String.fromCharCode(generateNumber()));
    let inputs = (<NodeListOf<HTMLInputElement>>settingsForm.querySelectorAll(".settings__input"));

    let [lengthInput, uppercaseInput, lowercaseInput, numbersInput, symbolsInput] = Array.from(inputs);

    if (uppercaseInput.checked) possible += ascii.substring(32, 58);
    if (lowercaseInput.checked) possible += ascii.substring(64, 90);
    if (numbersInput.checked) possible += ascii.substring(15, 25);
    if (symbolsInput.checked) possible += ascii.substring(0, 14) + ascii.substring(26, 33) + ascii.substring(59,65) + ascii.substring(91, 95);

    let iterations:number = parseInt(lengthInput.value);
    for(let i:number = 0; i < iterations; i++) {
        if (!possible[generateNumber(possible.length)]) {
            result = "Non-Random password";
            break;
        }
        result += possible[generateNumber(possible.length)];
    }
    
    password.value = result;
}

const ascii: string = generateASCII(); // rip hoisting
copy.addEventListener("click", copyText);
settingsForm.addEventListener("submit", generatePassword);