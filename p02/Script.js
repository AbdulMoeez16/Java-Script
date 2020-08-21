const container = document.querySelector ('.container');
const seats = document.querySelectorAll ('.row.seat:not(.occupied)');
const count = document.getElementById ('count');
const total = document.getElementById ('total');
const movieSelect = document.getElementById ('movie');
let ticketPrice = +movieSelect.value;

populateUI ();

//Pull data from local storage to build UI
function populateUI () {
    const selectedSeats = JSON.parse (localStorage.getItem ('selectedseats'));
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach ( (seat, index) => {
            if (selectedSeats.indexOf(index) > -1 ) {
                seat.classList.add ('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem ('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex  = selectedMovieIndex;
    }
}

//Function to update counts
function updateSelectedCount () {
    const selectedSeats = document.querySelectorAll ('.row .seat.selected')
    const countSelectedSeats = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    console.log(seatsIndex);

    localStorage.setItem ('selectedSeats', JSON.stringify(seatsIndex));
    
    count.innerText = countSelectedSeats;
    total.innerText = ticketPrice * countSelectedSeats
}

//function to save the selected movie and its price
function setMovieData (movieIndex, moviePrice) {
    localStorage.setItem ('selectedMovieIndex',movieIndex);
    localStorage.setItem ('selectedMoviePrice',moviePrice);
}

// Event listener for changing price with change of movie
movieSelect.addEventListener ('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount () ;
})

//Event listener to click on available seats
container.addEventListener ('click', (e) => {
    if (e.target.classList.contains ('seat') && !e.target.classList.contains ('occupied')) {
        e.target.classList.toggle ('selected')
        updateSelectedCount ();
    }
})

// Calculate initial number of seats and their price
updateSelectedCount ();