/* eslint-disable no-restricted-globals */
import './style/style-src.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/bvscpmjtUfg4AW2dXLnh';
const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');
const user = document.getElementById('user');
const score = document.getElementById('score');

const postData = async (user, score) => {
  await fetch(`${url}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score }),
  });
};

const clearInputs = () => {
  user.value = '';
  score.value = '';
};

const confirmationMessage = (valid) => {
  const errorMessage = document.getElementById('error-msg');
  const successMessage = document.getElementById('success-msg');
  if (valid) {
    successMessage.classList.remove('d-none');
    errorMessage.classList.add('d-none');
  } else {
    successMessage.classList.add('d-none');
    errorMessage.classList.remove('d-none');
  }
};

const addScoresToDom = (scores) => {
  const listOfScores = document.getElementById('list');
  listOfScores.innerHTML = '';
  scores.forEach((score) => {
    const li = document.createElement('li');
    li.className = 'flex-list';
    const userText = document.createElement('p');
    userText.className = 'user flex-list-item';
    userText.innerText = score.user;
    const scoreText = document.createElement('p');
    scoreText.className = 'score flex-list-item';
    scoreText.innerText = score.score;
    li.appendChild(userText);
    li.appendChild(scoreText);
    listOfScores.appendChild(li);
  });
};

const displayData = async () => {
  const result = await fetch(`${url}/scores`);
  const data = await result.json();
  const scores = data.result;
  addScoresToDom(scores);
};

submitBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (user.value.length === 0 || score.value.length === 0 || isNaN(score.value)) {
    confirmationMessage(false);
  } else {
    confirmationMessage(true);
    postData(user.value, score.value);
  }
  clearInputs();
});

refreshBtn.addEventListener('click', () => {
  displayData();
});

displayData();

fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
  method: 'POST',
  body: JSON.stringify({
    name: 'Rachid Game 2',
  }),
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.json()).then((responseData) => console.log(responseData));