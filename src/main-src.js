import './style/style-src.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/aOXLFNfc45MvyePSMZFH';
const submitBtn = document.getElementById('submit');
const refreshBtn = document.getElementById('refresh');

const postData = async (user, score) => {
  await fetch(`${url}/scores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score }),
  });
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
  const user = document.getElementById('user').value;
  const score = document.getElementById('score').value;
  postData(user, score);
});

refreshBtn.addEventListener('click', () => {
  displayData();
});

displayData();