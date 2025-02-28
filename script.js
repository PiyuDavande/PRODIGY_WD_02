
let timer;
let startTime;
let elapsedTime = 0;
let running = false;


const display = document.querySelector(".display");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.querySelector(".laps");


startPauseButton.addEventListener("click", function () {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 100);
        running = true;
        startPauseButton.textContent = "Pause";
        startPauseButton.style.background = "orange";
    } else {
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        running = false;
        startPauseButton.textContent = "Start";
        startPauseButton.style.background = "green";
    }
});


function updateTime() {
    let currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}


function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    let milliseconds = Math.floor((ms % 1000) / 10);
    
    return (
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds + ":" +
        (milliseconds < 10 ? "0" : "") + milliseconds
    );
}


resetButton.addEventListener("click", function () {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startPauseButton.textContent = "Start";
    startPauseButton.style.background = "green";
    lapsContainer.innerHTML = ""; 
});


lapButton.addEventListener("click", function () {
    if (running) {
        let lapTime = document.createElement("li");
        lapTime.textContent = display.textContent;
        lapsContainer.appendChild(lapTime);
    }
});
