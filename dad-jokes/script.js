const jokeElement = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

jokeBtn.addEventListener("click", generateJoke);

generateJoke();

// Using .then():
// function generateJoke() {
//   const settings = {
//     headers: {
//       Accept: "application/json",
//     },
//   };

//   fetch("https://icanhazdadjoke.com", settings)
//     .then((response) => response.json())
//     .then((data) => {
//       jokeElement.innerHTML = data.joke;
//     });
// }

// Using Async Await:
async function generateJoke() {
  const settings = {
    headers: {
      Accept: "application/json",
    },
  };

  const response = await fetch("https://icanhazdadjoke.com", settings);
  const data = await response.json();

  jokeElement.innerHTML = data.joke;
}
