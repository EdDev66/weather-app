const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const output = document.querySelector('.output');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/weather?address=' + search.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            output.innerHTML = data.error;
        } else {
        output.innerHTML = `${data.location}<br>${data.forecast}`;
        }
    })
    })
})

