const imgs = document.querySelectorAll('.content');
const btns = document.querySelectorAll('nav ul li');

// loop over the navigation options and list for a click
// on any of the options:
btns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    // remove the active/show classes from all the other
    // options before adding them to the option clicked:
    hideAll();
    // update color of the nav option clicked:
    btn.classList.add('active');
    // update the background image:
    imgs[idx].classList.add('show');
  });
});

function hideAll() {
  imgs.forEach((img) => img.classList.remove('show'));
  btns.forEach((btn) => btn.classList.remove('active'));
}
