// get the node list for the code digits:
const codes = document.querySelectorAll('.code');

// set the focus to the first digit as the screen is loaded:
codes[0].focus();

// loop over the node list and add a event listener for
// each code digit:
codes.forEach((digit, idx) => {
  // at each digit, listen for a 'keydown' event:
  digit.addEventListener('keydown', (pressed) => {
    codes[idx].value = '';
    // if the key pressed is a value between 0 and 9,
    // mode the focus to the next key:
    if (pressed.key >= 0 && pressed.key <= 9) {
      // use a setTimeout to wait long enough for the
      // key pressed to be registered in the current digit;
      // otherwise, the focus would be set to the next digit
      // before it could register and the pressed key would be
      // placed there instead:
      setTimeout(() => {
        codes[idx + 1].focus(), 10;
      });
    }
    // if the key pressed is the 'Backspace' key, erase the
    // current digit and go back to the previou one:
    else if (pressed.key === 'Backspace') {
      setTimeout(() => {
        codes[idx - 1].focus(), 10;
      });
    } else {
      alert('Enter a valid 0-9 value!');
    }
  });
});
