const loadText = document.querySelector('.loading-text');
const background = document.querySelector('.bg');

let loading = 0;
/*
- setInterval() method:
    This method repeats a given function at every given time-interval. It receives two
    parameters as argments, the first being the function which will be executed repeatedly
    and the second being the length of the time-interval between each execution.
- clearInterval() method:
    This method is responsible for stopping the execution of the function specified in the
    setInterval() method.
Example:
    function inc(){return (++num);}
    let inc4ever = setInterval(inc,50); //keeps calling inc() every 50ms
    ...
    clearInterval(inc4ever);
*/
let runFuncInterval = setInterval(blurring, 20);

function blurring() {
    loading++;

    if(loading > 99) {
        clearInterval(runFuncInterval);
    }

    loadText.innerText = `${loading}%`;
    loadText.style.opacity = scale(loading,0,100,1,0);
    background.style.filter = `blur(${scale(loading,0,100,30,0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (((num - in_min) * (out_max - out_min)) / (in_max - in_min)) + out_min;
}

/*
-- Resources:
1. Function 'scale' to map range of numbers:
https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
*/