const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const first = document.getElementById('first');
const last = document.getElementById('last');
const circles = document.querySelectorAll('.circle');

let currentlyActive = 1;

next.addEventListener('click', () => {
    ++currentlyActive;
    if(currentlyActive > circles.length) {
        currentlyActive = circles.length;
    }

    updateDOM();
});

prev.addEventListener('click', () => {
    --currentlyActive;
    if(currentlyActive < 1) {
        currentlyActive = 1;
    }

    updateDOM();
});

first.addEventListener('click', () => {
    currentlyActive = 1;

    updateDOM();
});

last.addEventListener('click', () => {
    currentlyActive = circles.length;

    updateDOM();
});

function updateDOM() {
    circles.forEach( (circle, idx) => {
        if(idx < currentlyActive) {
            circle.classList.add('active');
        }
        else {
            circle.classList.remove('active');
        }
    });

    const actives = document.querySelectorAll('.active');

    progress.style.width = ((actives.length - 1)/(circles.length - 1))*100 + '%';

    if(currentlyActive === 1) {
        prev.disabled = true;
        first.disabled = true;

        next.disabled = false;
        last.disabled = false;
    }
    else if (currentlyActive === circles.length) {
        next.disabled = true;
        last.disabled = true;

        prev.disabled = false;
        first.disabled = false;
    } 
    else {
        prev.disabled = false;
        next.disabled = false;
        first.disabled = false;
        last.disabled = false;
    }
}