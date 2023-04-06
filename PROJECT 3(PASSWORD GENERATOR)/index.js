const dl= document.querySelector("[data-lengthNumber]");
const copy = document.querySelector(".image1");
const check = document.querySelectorAll("input[type=checkbox]");
const st = document.querySelector(".div");
const gp = document.querySelector("[generatepass]");
const display = document.querySelector("[data-Display]");
const check1 = document.querySelector("#c1");
const check2 = document.querySelector("#c2");
const slider = document.querySelector(".sl");
const check3 = document.querySelector("#c3");
const check4 = document.querySelector("#c4");
const copymsg = document.querySelector("[data-copyMsg]");
const a = "+_-)(*&^%$#@!~`<>,.?/:;'}]{[|]}";

let password=""
let PasswordLength = 10;
let count=0;
HandleSlider();
function HandleSlider() {
    slider.value =PasswordLength;
    dl.innerText = PasswordLength;

    //USED TO HANDLE BACKGROUND OF SLIDER TO FILL PURPLE COLOR
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = (((PasswordLength - min) * 100) / (max - min)) + "100%";
}

//FUNCTION TO SET COLOR OF STRENGTH
function setIndicator(color) {
    st.style.backgroundColor = color;
    st.style.filter="drop-shadow(0 0 40px color)";
}

//FUNCTION TO GENERATE RANDOM NUMBER BETWEEN TWO NUMBERS
function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) +min;
}

//TO GENERATE NUMBER BETWEEN 0 TO 9
function generateRandomNumbers() {
    return generateRandomInteger(0, 9);
}

//TO GENERATE LOWERCASE CHARACTER
function generateLowerCase() {
    return String.fromCharCode(generateRandomInteger(97, 123));
}

//TO GENERATE UPPERCASE CHARACTER
function generateUpperCase() {
    return String.fromCharCode(generateRandomInteger(65, 91));
}


/*
APPROACH TO GENERATE SYMBOLS

1)PUT ALL SYMBOLS IN ONE STRING
2)GENERATE RANDOM NUMBERS BETWEEN 0 TO SIZE OF STRING-1 FOR RANDOM INDEX OF STRING
3)BY CONVERT INTEGER TO CHARACTER USING STRING.FROMCHARCODE
4)RETURN IT 

*/

//TO GENERATE SYMBOLS
function generateSymbols() {
    const randNum = generateRandomInteger(0, a.length);
    return a.charAt(randNum);
}


//CALCULATE STRENGTH
function calcstrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumbers = false;
    let hasSymbols = false;
    if (check1.checked) hasUpper = true;
    if (check2.checked) hasLower = true;
    if (check3.checked) hasNumbers = true;
    if (check4.checked) hasSymbols = true;

    if ((hasUpper && hasLower && hasNumbers ) || (hasUpper && hasLower &&hasNumbers && hasSymbols) || (hasLower && hasNumbers && hasSymbols) && PasswordLength>=8) {
        setIndicator("green");
    }
    else if ((hasUpper && hasLower) || (hasUpper && hasNumbers) || (hasLower && hasSymbols) || (hasSymbols && hasNumbers) || (hasUpper && hasSymbols)&& PasswordLength>=6) {
        setIndicator("yellow");
    }
    
    else {
        setIndicator("red");
    }

    
}
//COPY CONTENT FUNCTION
async function copyContent() {

    try {
        await navigator.clipboard.writeText(display.value);
        copymsg.innerText = "copied";
    }
    catch (e) {
        copymsg.innerText = "Failed";
    }
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active");
    }, 2000);
}

//FUNCTION TO SHUFFLE PASSWORD USING FISHER YATES ALGORITHM
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

//EVENT LISTENER USED TO COPY CONTENT WHEN CLICKED
copy.addEventListener('click', () => {
    if (display.value) {
        copyContent();
    }
})



//FUNCTION TO COUNT CHECKED CHECKBOXES
function handleCheckBoxChange() {
     count = 0;
    check.forEach((checkbox) => {
        if (checkbox.checked)
            count++;
    });

    if (PasswordLength < count) {
        PasswordLength = count;
        HandleSlider();
    }
}

//WHENEVER THERE IS A CHANGE IN CHECKBOX IT COUNTS TOTAL NUMBER OF CHECKED BOXES USING A FUNCTION
check.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})
 
//TO CHANGE VALUE OF PASSWORD LENGTH WE ADDED EVENT LISTENER
slider.addEventListener('input', (e) => {
    PasswordLength = e.target.value;
    HandleSlider();
})


gp.addEventListener('click', () => {
    //None of Checkbox Selected
    if (count == 0) {
        return;
    }

    if (PasswordLength < count) {
        PasswordLength = count;
        HandleSlider();
    }
   
    console.log('FINDING NEW PASSWORD');
    //FINDING NEW PASSWORD

    //REMOVE OLD PASSWORD
    password = "";

    //
   

    let funcArr = [];
    if (check1.checked) {
        funcArr.push(generateUpperCase);
    }

    if (check2.checked) {
        funcArr.push(generateLowerCase);
    }

    if (check3.checked) {
        funcArr.push(generateRandomNumbers);
    }

    if (check4.checked) {
        funcArr.push(generateSymbols);
    }

    //Compulsory Addition
    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("Compulsory Addition");

    for (let i = 0; i < PasswordLength - funcArr.length; i++) {
        let randIndex = generateRandomInteger(0, funcArr.length);
        console.log("randIndex" + i);
        password += funcArr[randIndex]();
    }
    console.log('random addition');
    
    //SHUFFLE THE PASSWORD
    password = shufflePassword(Array.from(password));
    display.value = password;

    calcstrength();
    






});


