
let timeBlocks = document.querySelectorAll(".time-block");
let buttons = document.getElementsByClassName("save");
let date = document.querySelector('#date');
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const clear = document.querySelector("#clear");

displayPlan();
UpdateDate();
UpdateColor();
setInterval(UpdateColor, 1000);

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', save);
}

function save(event) {
    let input = event.target.previousSibling.previousSibling;
    localStorage.setItem(input.previousSibling.previousSibling.innerHTML, input.value);
}

// Goes through time blocks and loads notes from local storage
function displayPlan() {
    for (var i = 0; i < timeBlocks.length; i++) {
        let value = localStorage.getItem(timeBlocks[i].querySelector('.time').innerHTML);
        if (value != null) {
            timeBlocks[i].querySelector(".input").value = value;
        } else {
            timeBlocks[i].querySelector(".input").value = '';
        }
    }
}

function UpdateColor() {
    let hour = new Date().getHours();
    for (var i = 0; i < timeBlocks.length; i++) {
        if (timeBlocks[i].dataset.time < hour) {
            timeBlocks[i].querySelector('.input').setAttribute('class', 'input gray');
        } else if (timeBlocks[i].dataset.time == hour) {
            timeBlocks[i].querySelector('.input').setAttribute('class', 'input red');
        } else {
            timeBlocks[i].querySelector('.input').setAttribute('class', 'input green');
        }
    }
}

function UpdateDate() {
    let day = new Date();
    let suffix = 'th';
    let firstDigit = Math.floor(day.getDate() % 10);
    if (firstDigit == 1) {
        suffix = 'st';
    } else if (firstDigit == 2) {
        suffix = 'nd';
    } else if (firstDigit == 3) {
        suffix = 'rd';
    }
    date.innerHTML =  `${days[day.getDay()]}, ${months[day.getMonth()]} ${day.getDate()}${suffix}`;
}

clear.addEventListener('click', function(){
    localStorage.clear();
    displayPlan();
})