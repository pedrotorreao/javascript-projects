const toggles = document.querySelectorAll(".toggle");
const good = document.querySelector("#good");
const cheap = document.querySelector("#cheap");
const fast = document.querySelector("#fast");

toggles.forEach((toggle) =>
  toggle.addEventListener("change", (e) => updatePreferences(e.target))
);

function updatePreferences(clickedElement) {
  if (good.checked && cheap.checked && fast.checked) {
    if (good == clickedElement) {
      fast.checked = false;
    }
    if (cheap == clickedElement) {
      good.checked = false;
    }
    if (fast == clickedElement) {
      cheap.checked = false;
    }
  }
}
