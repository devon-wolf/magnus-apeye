const endpointTestForm = document.getElementById('endpoint-test-form');
const endpointInput = document.getElementById('endpoint-input');
const apiOutput = document.getElementById('api-output');

const HEROKU_URL = 'https://magnus-archive.herokuapp.com';

endpointTestForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch(`${HEROKU_URL}/${endpointInput.value}`);
    const json = await response.json();
    apiOutput.innerText = JSON.stringify(json, null, 2);
    endpointInput.value = '';
})