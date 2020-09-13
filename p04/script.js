const currOnePicker = document.getElementById ('currency-one');
const currTwoPicker = document.getElementById ('currency-two');
const currOneAmount = document.getElementById ('amount-one');
const currTwoAmount = document.getElementById ('amount-two');
const flipButton = document.getElementById ('flip');
const rate = document.getElementById ('rate');

// fetch exchange rate from 3rd party API and update DOM
function calculate () {
    const currOneCode = currOnePicker.value;
    const currTwoCode = currTwoPicker.value;

    fetch (`https://v6.exchangerate-api.com/v6/3dd812897ef3a530d91b9d8b/latest/${currOneCode}`)
        .then (res => res.json () )
        .then (data => {
            const exchangeRate = data.conversion_rates [currTwoCode];

            rate.innerText = `1 ${currOneCode} = ${exchangeRate} ${currTwoCode}` ; 

            currTwoAmount.value = (currOneAmount.value * exchangeRate).toFixed (1);
        });
}

function flip () {
    const temp = currOnePicker.value;
    currOnePicker.value = currTwoPicker.value ;
    currTwoPicker.value = temp ;
    calculate  ();
};

// Event listeners
currOnePicker.addEventListener ('change',calculate) ;
currTwoPicker.addEventListener ('change', calculate) ;
currOneAmount.addEventListener ('input',calculate);
currTwoAmount.addEventListener ('input',calculate);  
flipButton.addEventListener ('click' , flip);

calculate ();