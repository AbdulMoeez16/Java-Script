const video = document.getElementById ('video');
const play = document.getElementById ('play');
const stop = document.getElementById ('stop');
const progress = document.getElementById ('progress');
const timestamp = document.getElementById ('timestamp');

//Functions
// function to toggle video (play or pause)
function toggleVideo () {
    if (video.paused) {
        video.play ();
    } else {
        video.pause ();
    }
};

//function to update icon (toggle between play and pause)
function updateIcon () {
    if (video.paused) {
        play.innerHTML = '<i class="fas fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fas fa-pause fa-2x"></i>';
    }
};

// Function to update progress bar and timestamp
function updateProgress () {
    progress.value = video.currentTime / video.duration * 100 ;

    //update timestamp
    let minutes = Math.floor(video.currentTime/60);
    let seconds = Math.floor(video.currentTime % 60);
    if (minutes < 10) {
        minutes = `0${minutes}`;

    }
    if (seconds < 10) {
        seconds = `0${seconds}`;

    }
    // display timestamp
    timestamp.innerHTML =  `${minutes}:${seconds}` ;
};

// function to stop video and reset time to 0
function stopVideo () {
    video.pause ();
    video.currentTime = 0;
};

//Function to set progress to click on it for changing time
function setProgress () {
    video.currentTime = progress.value*video.duration/100 ;
};


// Event Listeners
// Click to play the video or pause
video.addEventListener ('click', toggleVideo); 

// Pause to toggle play icon to pause icon
video.addEventListener ('pause', updateIcon);

// Play to toggle pause icon back to play icon
video.addEventListener ('play', updateIcon);

// Update progress bar and timestamp
video.addEventListener ('timeupdate',updateProgress);

// Click to play the video or pause on Play button
play.addEventListener ('click',toggleVideo);

// Click to reset video on the Stop button
stop.addEventListener ('click', stopVideo);

// Change position on progress bar to change time of the video
progress.addEventListener ('change', setProgress);