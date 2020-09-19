//getting DOM Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById ('add-user');
const doubleMoneyButton = document.getElementById ('double');
const showMillionairesButton = document.getElementById ('show-millionairs')
const sortButton = document.getElementById ('sort');
const totalButton = document.getElementById ('calculate-total');

let data = [];

//create Initial User
generateRandomUser ();
generateRandomUser ();
generateRandomUser ();
generateRandomUser ();



//function to fetch random user from API
async function generateRandomUser () {
   const res = await fetch ('https://randomuser.me/api');
   const data = await res.json ();

   const user = data.results[0];

   const newUser = {
       name: `${user.name.first} ${user.name.last}` ,
       worth: Math.round(Math.random()*1000000)
   };

   addData (newUser);
}

//doubleworth
function doubleWorth () {
    data=data.map ( item => {
        return {...item, worth : item.worth * 2}
    });
    updateDOM ();
}

//sort 
function sort () {
    data.sort( (a,b) => b.worth - a.worth);

    updateDOM ();
}

//filter
function filter () {
    data = data.filter (
        item => item.worth > 1000000
    );
    updateDOM ();
}

//Calculate the total worth
function calc () {
    const totalWorth =data.reduce (
        (acc,item) => (acc += item.worth), 0
    );   
    const totalNetWorth =document.createElement ('div');
    totalNetWorth.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild (totalNetWorth);
}

//Add newly generated user into data array
function addData(newUser) {
    data.push (newUser);

    updateDOM ();
}



//FUnction to update UI window
function updateDOM (inputData = data) {
    main.innerHTML = '<h2><strong>Name</strong> Net Worth</h2>';

    inputData.forEach( item => {
      const element = document.createElement('div');
      element.classList.add('name');
      element.innerHTML = `<strong>${item.name}</strong> PKR ${formatCurrency(item.worth)}`;
      main.appendChild (element);
    });
}

//function to format a number as a currency
function formatCurrency (num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


//Event listeners 
addUserButton.addEventListener ('click',generateRandomUser);
doubleMoneyButton.addEventListener ('click', doubleWorth);
sortButton.addEventListener ('click',sort);
showMillionairesButton.addEventListener ('click', filter);
totalButton.addEventListener ('click', calc);