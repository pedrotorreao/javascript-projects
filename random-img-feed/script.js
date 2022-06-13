const container = document.querySelector('.container');
const unsplashURL = 'https://source.unsplash.com/random/';

const ROWS = 10;

for (let i = 0; i < ROWS * 3; ++i) {
  const curr_img = document.createElement('img');

  let curr_img_size = getRandomSize();

  curr_img.src = getFullURL(curr_img_size);

  container.appendChild(curr_img);
}

function getRandomSize() {
  return `${getRandomHeight()}x${getRandomWidth()}`;
}

function getRandomHeight() {
  return Math.floor(Math.random() * 10) + 300;
}

function getRandomWidth() {
  return Math.floor(Math.random() * 10) + 300;
}

function getFullURL(new_image_size) {
  return `${unsplashURL}${new_image_size}`;
}
