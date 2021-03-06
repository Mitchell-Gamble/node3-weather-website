console.log('Client side javascript has loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#firstMessage')
const messageTwo = document.querySelector('#secondMessage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.description + data.forecast.temperature + data.forecast.feelsLike + data.forecast.wind_speed + data.forecast.wind_dir
            }
        })
    })
})