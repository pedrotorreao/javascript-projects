const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const logMessages = [
  'Good Morning!',
  "It's Friday!",
  'Have a good weekend!',
  'Action not allowed'
];

button.addEventListener('click', () => createNotification());

const createNotification = () => {
  // create a new 'div' HTML element:
  const popup = document.createElement('div');
  // add the 'toast' class to the newly created element:
  popup.classList.add('toast');
  // add the inner content to the 'div':
  popup.innerText = getRandomMessage();
  // append a new child (new notification/popup) to the 'toasts'
  // container so it is displayed in the DOM:
  toasts.appendChild(popup);
  // remove it from the DOM after some time, so old popups do
  // not clutter the view:
  setTimeout(() => {
    popup.remove();
  }, 4000);
};

const getRandomMessage = () => {
  const randomMsgId = Math.floor(Math.random() * logMessages.length);

  return logMessages[randomMsgId];
};
