// get the images container:
const imgsContainer = document.getElementById('imgs');
// add a variable for the 'Previous' button:
const prevButton = document.getElementById('left');
// add a variable for the 'Next' button:
const nextButton = document.getElementById('right');
// get a node list containing all the images:
const allImages = document.querySelectorAll('#imgs img');

// image index:
let imgIdx = 0;

// interval at which the images are changed:
// 'setInterval' receives two arguments, the function to be called, in this case 'runCarousel, and the interval at which this functions gets called in ms:
let interval = setInterval(runCarousel, 3000);

/**
 * runCarousel()
 * updates the image index, 'imgIdx', to the next image and
 * calls the function 'advanceToNextImage' that updates the
 * 'translate' value of the 'transform' css property
 */
function runCarousel() {
  imgIdx = imgIdx < allImages.length - 1 ? ++imgIdx : 0;

  advanceToNextImage();
}

function advanceToNextImage() {
  //..
}
