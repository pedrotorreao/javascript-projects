const textElement = document.getElementById("text");
const speedElement = document.getElementById("speed");

let textInput = prompt("Enter text to be typed: ");

let idx = 1;
let speed = 300 / speedElement.nodeValue;

writeText();

function writeText() {
  textElement.innerText = textInput.slice(0, idx);

  ++idx;

  if (idx > textInput.length) {
    idx = 1;
  }

  setTimeout(writeText, speed);
}

speedElement.addEventListener("input", (e) => (speed = 300 / e.target.value));
