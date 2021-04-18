const tagsElements = document.getElementById("tags");
const textArea = document.getElementById("textarea");

/* A.focus(): focus on the element A as soon as the page loads. */
textArea.focus();

textArea.value = ""; // clear the textarea when the page reloads

/* triggers the callback function whenever there is a 'keyup', i.e. whenever a pressed key is released.*/
textArea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = ""; //clears input when "Enter" is pressed
    }, 10);

    randomSelector();
  }
});
/* createTags(): this function takes the text inserted in the textarea element and splits it whenever it finds a comma.*/
function createTags(input) {
  /* tags: array containing the elements created from the original string input entered into the textarea */
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "") // removes empty strings
    .map((tag) => tag.trim()); //removes whitespace from both ends

  tagsElements.innerHTML = "";

  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;

    tagsElements.appendChild(tagEl);
  });
}

function randomSelector() {
  const times = 30; // how many times the tags will be highlighted

  /* shift the higlight class randomly through the tags by selecting a random tag, highlighting it, waiting for some time and unhighlighting it. */
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    highlightTag(randomTag);

    setTimeout(() => {
      unhighlightTag(randomTag);
    }, 100);
  }, 100);

  /* choose a random tag and highlight it */
  setTimeout(() => {
    clearInterval(interval); // stops the 'shifting' effect

    setTimeout(() => {
      const randomTag = pickRandomTag();

      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

/* pickRandomTag: function to select a random tag based on the tags created from the string entered into the textarea element. */
function pickRandomTag() {
  const tags = document.querySelectorAll(".tag");

  return tags[Math.floor(Math.random() * tags.length)];
}

/* highlightTag: adds the highlight class to the passed argument.*/
function highlightTag(tag) {
  tag.classList.add("highlight");
}

/* unhighlightTag: removes the highlight class from the passed argument.*/
function unhighlightTag(tag) {
  tag.classList.remove("highlight");
}
