const postData = async (user, score) => {
  await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/VSMpU4FtgeRTlXkLPFBz/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user, score }),
  });
};

export { postData as default };