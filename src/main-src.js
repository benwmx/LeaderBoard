import './style-src.css';

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VSMpU4FtgeRTlXkLPFBz';
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
  const msg = document.getElementById('msg-empty');
  msg.parentElement.removeChild(msg);
  scores.forEach(score => {
    const li = document.createElement('li');
    const userText = document.createElement('p');
    userText.classList.add('user flex-list-item');
    userText.innerText = score.user;
    const scoreText = document.createElement('p');
    scoreText.classList.add('score flex-list-item');
    scoreText.innerText = score.score;
    li.appendChild(userText);
    li.appendChild(scoreText);
  });
};

const displayData = async () => {
  const result = await fetch(`${url}/scores`);
  const data = await result.json();
  const scores = data.result;
  addScoresToDom(scores);
};

