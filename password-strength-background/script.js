const pw = document.getElementById('password');
const bg = document.getElementById('background');

pw.addEventListener('input', (e) => {
  const pw_entered = e.target.value;
  const pw_length = pw_entered.length;

  // 20px is the initial value for the blur, set in the css file:
  const bg_blurValue = 20 - pw_length * 2;
  // change the filter blur property to different values based
  // on the length of the password entered:
  bg.style.filter = `blur(${bg_blurValue}px)`;
});
