// get the images container:
const imgsContainer = document.getElementById('imgs');
// add a variable for the 'Previous' button:
const prevButton = document.getElementById('left');
// add a variable for the 'Next' button:
const nextButton = document.getElementById('right');
// get a node list containing all the images:
const allImages = document.querySelectorAll('#imgs img');

// constant image width set in the CSS file:
const WIDTH = -500; // -500px, negative since moving to the right of the viewport
// image index:
let imgIdx = 0;

/** interval at which the images are changed:
 * 'setInterval' usually receives two arguments, the function to be called, in this
 * case 'runCarousel, and the interval at which this functions gets called in ms:
 */
let interval = setInterval(autoRunCarousel, 3000);

/**
 * resetInterval():
 * clears the current interval to avoid glitchy image transitions and set it
 * back to original value.
 */
function resetInterval() {
  clearInterval(interval);

  interval = setInterval(autoRunCarousel, 3000);
}

/**
 * autoRunCarousel():
 * updates the image index, 'imgIdx', to the next image and calls the function
 * 'moveCarouselToIdx' that updates the 'translate' value of the 'transform'
 * css property. The default movement direction for the carousel is right, i.e.
 * incrementing 'imgIdx.
 */
function autoRunCarousel() {
  // increment 'imgIdx' if possible; otherwise, turn around:
  imgIdx = imgIdx < allImages.length - 1 ? ++imgIdx : 0;

  moveCarouselToIdx();
}

function moveCarouselToIdx() {
  // update the value of the transform attribute based on the 'imgIdx':
  let translateVal = imgIdx * WIDTH;
  // update CSS 'transform' property:
  imgsContainer.style.transform = `translate(${translateVal}px)`;
}

/**
 * Event listener for the 'Prev' button. Once clicked, moves carousel back one image
 * if possible; otherwise, turns carousel around to last image:
 */
prevButton.addEventListener('click', () => {
  // decrement 'imgIdx' if possible; otherwise, turn around:
  imgIdx = imgIdx == 0 ? allImages.length - 1 : --imgIdx;

  moveCarouselToIdx();
  resetInterval();
});

/**
 * Event listener for the 'Next' button. Once clicked, moves carousel forward one
 * image if possible; otherwise, turns carousel around to first image:
 */
nextButton.addEventListener('click', () => {
  // increment 'imgIdx' if possible; otherwise, turn around:
  imgIdx = imgIdx < allImages.length - 1 ? ++imgIdx : 0;

  moveCarouselToIdx();
  resetInterval();
});
