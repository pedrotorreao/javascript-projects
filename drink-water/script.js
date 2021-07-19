const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

updateBigCup();

// iterate through the cups and listen for a 'click' event and
// when that happens, highlight (fill) the cup:
smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", () => {
    highlightCup(idx);
  });
});

/**
 * Function to update the status (full/empty) of the small cups.
 * @param {number} idx index of the cup which was clicked
 */
function highlightCup(idx) {
  // if the cup clicked is full and its neighbor is empty,
  // empty current cup:
  if (
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling.classList.contains("full")
  ) {
    idx--;
  }

  // iterate through the cups and check if current index is less than the
  // index of the clicked cup; if so, fill the cups; if not, empty it:
  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  updateBigCup();
}

/**
 * Function for updating the progress cup based on the statuses of the
 * smaller cups:
 */
function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerHTML = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
  }
}
