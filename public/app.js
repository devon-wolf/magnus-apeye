const endpointTestForm = document.getElementById('endpoint-test-form');
const endpointInput = document.getElementById('endpoint-input');
const apiOutput = document.getElementById('api-output');

const LOCAL_URL = 'http://localhost:7890';
const HEROKU_URL = 'https://magnus-archive.herokuapp.com';

endpointTestForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (endpointInput.value.startsWith('episodes')) {
    const response = await fetch(`${HEROKU_URL}/${endpointInput.value}`);
    const json = await response.json();
    apiOutput.innerText = JSON.stringify(json, null, 2);
    endpointInput.value = '';
  } else {
    apiOutput.innerText =
      'please enter a valid endpoint, e.g. "episodes" or "episodes/1"';
  }
});
