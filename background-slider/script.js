const pageBody = document.body;
const slides = document.querySelectorAll('.slide');
const leftArrow = document.getElementById('left');
const rightArrow = document.getElementById('right');

let currentlyActiveSlide = 0;

// listen for a click on the left arrow button:
leftArrow.addEventListener('click', () => {
  // updates the value of 'currentlyActiveSlide':
  currentlyActiveSlide =
    currentlyActiveSlide - 1 < 0 ? slides.length - 1 : currentlyActiveSlide - 1;

  // call background update functions:
  setBackgroundToBody();
  setActiveSlide();
});

// listen for a click on the right arrow button:
rightArrow.addEventListener('click', () => {
  // updates the value of 'currentlyActiveSlide':
  currentlyActiveSlide =
    currentlyActiveSlide + 1 > slides.length - 1 ? 0 : currentlyActiveSlide + 1;

  // call background update functions:
  setBackgroundToBody();
  setActiveSlide();
});

setBackgroundToBody();

// Update currently active background slide image. This function updates
// the background image from its previous value to 'currentlyActiveSlide':
function setBackgroundToBody() {
  pageBody.style.backgroundImage =
    slides[currentlyActiveSlide].style.backgroundImage;
}

// Update currently active slide. This function removes the 'active'
// class from the current front image and adds it to 'currentlyActiveSlide':
function setActiveSlide() {
  slides.forEach((slide) => {
    slide.classList.remove('active');
  });

  slides[currentlyActiveSlide].classList.add('active');
}
