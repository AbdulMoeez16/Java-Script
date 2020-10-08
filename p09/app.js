// Get DOM elements
const balance = document.getElementById('balance');
const money_plus =  document.getElementById('money-plus');
const money_minus =  document.getElementById('money-minus');
const list =  document.getElementById('list');
const form =  document.getElementById('form');
const description =  document.getElementById('description');
const amount =  document.getElementById('amount');
var acc = document.getElementById("accordion");
var c;

// Dummy Transactions
const dummyTransactions = [];
let transactions = dummyTransactions;
//console.log(localStorage.getItem('transactions'));
if(localStorage.getItem('transactions')) {
    transactions =  JSON.parse(localStorage.getItem('transactions'));
} 



// Function to generate an ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add a New Transaction from the Form
function addTransaction(e) {
    e.preventDefault();
    if( description.value.trim() === '' || amount.value.trim() === '' ) {
        alert('Please enter a valid description and transaction amount.')
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value
            };
        
        console.log(transaction);
        transactions.push(transaction);
        localStorage.setItem('transactions',JSON.stringify(transactions));
        console.log(localStorage.getItem("transactions"));
        addTransactionUI(transaction);
        updateSums();

        description.value = '';
        amount.value = '';
    }
}

// Function to Remove a Transaction
function deleteTransaction(id) {
    transactions = transactions.filter( transaction => transaction.id != id );
    init();
}

// Function to display Transactions in Transaction History
function addTransactionUI(transaction) {
    // Classify if income or expense
    const type = transaction.amount > 0 ? '+' : '-';

    // Create DOM Element for List Item
    const item = document.createElement('li');

    // Add class for list item based on type
    item.classList.add( transaction.amount  > 0 ? 'plus' : 'minus' );

    item.innerHTML = `
        ${transaction.description}
        <span>${type}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})"><i class="fa fa-trash"></i></button>
    `;

    list.appendChild(item);
}

// Function to update the balance, income, and expense summaries
function updateSums() {
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    
    // Calculate total value for balance
    let total = 0;
     total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    if(isNaN(total)) {
        total = 0;
    }
    // Calculate total income
    const income = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);

    // Calculate total expense
    const expense = amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Update Balance in DOM

    balance.innerText = `${total} USD`

    // Update Income in DOM
    money_plus.innerText = `${income} USD`

    // Update Expense in DOM
    money_minus.innerText = `${expense} USD`
}

// Function to initialize the App
function init() {
    list.innerHTML = '';
    if(transactions.length > 0) {
        transactions.forEach(addTransactionUI);
        updateSums();
    }
}

// Event Listeners
// 1. Event Listener for form submit
form.addEventListener('submit', addTransaction);

init();


acc.addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = document.getElementById("panel");
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
});
